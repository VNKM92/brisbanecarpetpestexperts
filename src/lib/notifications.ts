import { prisma } from './prisma';
import { logActivity } from './activity-logger';

// ----------------------------------------------------
// 1. TRANSACTIONAL EMAIL DISPATCHER
// ----------------------------------------------------

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  recipientName?: string;
}

export async function sendEmailNotification({
  to,
  subject,
  htmlContent,
  recipientName,
}: SendEmailParams): Promise<{ success: boolean; logId?: string; error?: string }> {
  try {
    // If SMTP / Resend / SendGrid credentials are provided in env:
    const apiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM || 'noreply@brisbanecarpet.com';

    let sendStatus = 'SENT';
    let errorMessage: string | null = null;

    if (apiKey && process.env.NODE_ENV === 'production') {
      // Direct HTTP integration with email provider API
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: `Brisbane Cleaning Experts <${fromEmail}>`,
            to: [to],
            subject,
            html: htmlContent,
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          sendStatus = 'FAILED';
          errorMessage = JSON.stringify(errData);
        }
      } catch (err: any) {
        sendStatus = 'FAILED';
        errorMessage = err?.message || 'SMTP transport failed';
      }
    }

    // Save Email Dispatch Record in SQL EmailLog table
    const log = await prisma.emailLog.create({
      data: {
        recipient: to,
        subject,
        body: htmlContent,
        status: sendStatus,
        error: errorMessage,
      },
    });

    return { success: sendStatus === 'SENT', logId: log.id, error: errorMessage || undefined };
  } catch (err: any) {
    console.error('Failed to log email dispatch:', err);
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// 2. WHATSAPP BUSINESS API DISPATCHER
// ----------------------------------------------------

interface SendWhatsappParams {
  phone: string;
  message: string;
  recipientName?: string;
}

export async function sendWhatsappNotification({
  phone,
  message,
  recipientName,
}: SendWhatsappParams): Promise<{ success: boolean; logId?: string; error?: string }> {
  try {
    const waToken = process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_API_KEY;
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    let waStatus = 'SENT';

    // Format phone to E.164 (Brisbane +61 prefix if local AU format)
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0') && cleanPhone.length === 10) {
      cleanPhone = '61' + cleanPhone.substring(1);
    }

    // Official Meta / WhatsApp Cloud API Integration
    if (waToken && waPhoneId) {
      try {
        const waResponse = await fetch(
          `https://graph.facebook.com/v19.0/${waPhoneId}/messages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${waToken}`,
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: cleanPhone,
              type: 'text',
              text: { body: message },
            }),
          }
        );

        if (waResponse.ok) {
          waStatus = 'DELIVERED';
        } else {
          waStatus = 'FAILED';
        }
      } catch (e) {
        waStatus = 'FAILED';
      }
    }

    // Log to SQL WhatsappLog table
    const log = await prisma.whatsappLog.create({
      data: {
        phone: cleanPhone || phone,
        message,
        direction: 'OUTBOUND',
        status: waStatus,
      },
    });

    return { success: waStatus !== 'FAILED', logId: log.id };
  } catch (err: any) {
    console.error('Failed to log WhatsApp dispatch:', err);
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// 3. ADMIN IN-APP NOTIFICATION GENERATOR
// ----------------------------------------------------

export async function createAdminNotification({
  title,
  message,
  type = 'INFO',
  link,
}: {
  title: string;
  message: string;
  type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  link?: string;
}) {
  try {
    return await prisma.notification.create({
      data: {
        title,
        message,
        type,
        link,
        isRead: false,
      },
    });
  } catch (err) {
    console.error('Failed to create admin notification:', err);
  }
}

// ----------------------------------------------------
// 4. WORKFLOW: PROCESS INBOUND ENQUIRY
// ----------------------------------------------------

export async function handleInboundEnquiryNotification({
  enquiryId,
  enquiryNumber,
  firstName,
  lastName,
  email,
  phone,
  service,
  message,
  ipAddress,
  userAgent,
}: {
  enquiryId: string;
  enquiryNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const customerFullName = `${firstName} ${lastName}`.trim();
  const adminEmail = process.env.ADMIN_EMAIL || 'info@brisbane.com';

  // 1. Send Customer Confirmation Email
  const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h2 style="color: #059669; margin-top: 0;">Thank You for Your Enquiry!</h2>
      <p>Hi ${firstName},</p>
      <p>We have successfully received your service enquiry for <strong>${service || 'Cleaning Services'}</strong>.</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
        <p style="margin: 0 0 8px 0;"><strong>Enquiry Reference:</strong> <span style="color: #059669; font-weight: bold;">${enquiryNumber}</span></p>
        <p style="margin: 0 0 8px 0;"><strong>Requested Service:</strong> ${service || 'General Cleaning'}</p>
        <p style="margin: 0;"><strong>Status:</strong> Under Review by Dispatch Team</p>
      </div>
      <p>Our Brisbane team will review your details and contact you within <strong>15–30 minutes</strong> during standard business hours.</p>
      <p>If you need urgent assistance, please call us directly at <strong>0434 061 188</strong>.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
      <p style="font-size: 12px; color: #64748b;">Brisbane Carpet & Pest Experts · Brisbane, Queensland, Australia</p>
    </div>
  `;

  await sendEmailNotification({
    to: email,
    subject: `Enquiry Received [${enquiryNumber}] - Brisbane Carpet & Pest Experts`,
    htmlContent: customerEmailHtml,
    recipientName: customerFullName,
  });

  // 2. Send Admin Alert Email
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0;">
      <h3 style="color: #0f172a;">🔔 New Customer Enquiry: ${enquiryNumber}</h3>
      <p><strong>Customer:</strong> ${customerFullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service || 'General Enquiry'}</p>
      <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      <p><strong>IP Address:</strong> ${ipAddress || 'Unknown'}</p>
      <hr />
      <p><a href="http://localhost:3000/admin/enquiries" style="color: #059669; font-weight: bold;">View in Admin Panel →</a></p>
    </div>
  `;

  await sendEmailNotification({
    to: adminEmail,
    subject: `[NEW ENQUIRY] ${enquiryNumber} - ${customerFullName} (${service || 'Cleaning'})`,
    htmlContent: adminEmailHtml,
    recipientName: 'Admin Team',
  });

  // 3. Send WhatsApp Notification to Customer
  const waMessage = `Hello ${firstName}! 👋 Thank you for contacting Brisbane Carpet & Pest Experts. We have received your enquiry (${enquiryNumber}) for ${service || 'cleaning services'}. Our dispatch manager is reviewing your request and will follow up shortly. Need urgent assistance? Call 0434 061 188.`;
  await sendWhatsappNotification({
    phone,
    message: waMessage,
    recipientName: customerFullName,
  });

  // 4. Create In-App Admin Notification
  await createAdminNotification({
    title: `New Enquiry: ${enquiryNumber}`,
    message: `${customerFullName} requested a quote for ${service || 'Cleaning'}.`,
    type: 'SUCCESS',
    link: '/admin/enquiries',
  });

  // 5. Log System Activity
  await logActivity({
    userName: customerFullName,
    action: 'CREATE',
    module: 'Enquiries',
    entityId: enquiryId,
    details: {
      enquiryNumber,
      customer: customerFullName,
      email,
      phone,
      service,
    },
    ipAddress,
    userAgent,
  });
}

// ----------------------------------------------------
// 5. WORKFLOW: PROCESS INBOUND BOOKING
// ----------------------------------------------------

export async function handleInboundBookingNotification({
  bookingId,
  bookingNumber,
  customerName,
  customerEmail,
  customerPhone,
  serviceName,
  serviceAddress,
  scheduledDate,
  timeSlot,
  totalPrice,
  ipAddress,
  userAgent,
}: {
  bookingId: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  serviceAddress: string;
  scheduledDate?: string;
  timeSlot?: string;
  totalPrice: number;
  ipAddress?: string;
  userAgent?: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@brisbane.com';

  // 1. Send Customer Confirmation Email
  const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #059669; margin-top: 0;">Your Booking Request is Confirmed!</h2>
      <p>Hi ${customerName},</p>
      <p>Thank you for booking with Brisbane Carpet & Pest Experts. Here are your reservation details:</p>
      
      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Booking Reference:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #059669;">${bookingNumber}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Service:</td>
            <td style="padding: 6px 0; font-weight: bold;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Service Address:</td>
            <td style="padding: 6px 0;">${serviceAddress}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Preferred Schedule:</td>
            <td style="padding: 6px 0;">${scheduledDate ? new Date(scheduledDate).toLocaleDateString('en-AU') : 'Flexible'} (${timeSlot || 'Anytime'})</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b;">Estimated Total:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">$${totalPrice.toFixed(2)} AUD</td>
          </tr>
        </table>
      </div>

      <p>Our field dispatch team is assigning your certified cleaning technician. We will notify you when the team is on the way.</p>
      <p>Need to modify your booking? Reply to this email or call <strong>0434 061 188</strong>.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
      <p style="font-size: 12px; color: #64748b;">Brisbane Carpet & Pest Experts · 100% Satisfaction & Bond Back Guarantee</p>
    </div>
  `;

  await sendEmailNotification({
    to: customerEmail,
    subject: `Booking Confirmation [${bookingNumber}] - Brisbane Carpet & Pest Experts`,
    htmlContent: customerEmailHtml,
    recipientName: customerName,
  });

  // 2. Send Admin Alert Email
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px; border: 1px solid #e2e8f0;">
      <h3 style="color: #0f172a;">🎉 New Booking Received: ${bookingNumber}</h3>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail} | <strong>Phone:</strong> ${customerPhone}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Address:</strong> ${serviceAddress}</p>
      <p><strong>Estimated Total:</strong> $${totalPrice.toFixed(2)} AUD</p>
      <hr />
      <p><a href="http://localhost:3000/admin/bookings" style="color: #059669; font-weight: bold;">View Booking Dispatch Board →</a></p>
    </div>
  `;

  await sendEmailNotification({
    to: adminEmail,
    subject: `[NEW BOOKING] ${bookingNumber} - ${customerName} ($${totalPrice})`,
    htmlContent: adminEmailHtml,
    recipientName: 'Admin Team',
  });

  // 3. Send WhatsApp Notification
  const waBookingMsg = `Hi ${customerName}! 🧼 Your cleaning booking ${bookingNumber} for ${serviceName} has been received. Total estimate: $${totalPrice}. Our team is scheduling your technician. Questions? Call 0434 061 188.`;
  await sendWhatsappNotification({
    phone: customerPhone,
    message: waBookingMsg,
    recipientName: customerName,
  });

  // 4. Create In-App Admin Notification
  await createAdminNotification({
    title: `New Booking: ${bookingNumber}`,
    message: `${customerName} booked ${serviceName} for $${totalPrice}.`,
    type: 'SUCCESS',
    link: '/admin/bookings',
  });

  // 5. Log System Activity
  await logActivity({
    userName: customerName,
    action: 'CREATE',
    module: 'Bookings',
    entityId: bookingId,
    details: {
      bookingNumber,
      customer: customerName,
      email: customerEmail,
      phone: customerPhone,
      service: serviceName,
      totalPrice,
    },
    ipAddress,
    userAgent,
  });
}
