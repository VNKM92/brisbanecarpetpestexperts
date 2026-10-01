import { prisma } from './prisma';
import { logActivity } from './activity-logger';
import { sendEmail } from './mailer';

// ----------------------------------------------------
// 1. TRANSACTIONAL EMAIL DISPATCHER
// ----------------------------------------------------

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  recipientName?: string;
  replyTo?: string;
}

export async function sendEmailNotification({
  to,
  subject,
  htmlContent,
  recipientName,
  replyTo,
}: SendEmailParams): Promise<{ success: boolean; logId?: string; error?: string }> {
  try {
    const dispatchResult = await sendEmail({
      to,
      subject,
      html: htmlContent,
      replyTo,
    });

    const sendStatus = dispatchResult.success ? 'SENT' : 'FAILED';
    const errorMessage = dispatchResult.error || null;

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

    return { success: dispatchResult.success, logId: log.id, error: errorMessage || undefined };
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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Enquiry Received - Brisbane Carpet & Pest Experts</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 24px 12px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
              
              <!-- HEADER -->
              <tr>
                <td style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); padding: 32px 28px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Brisbane Carpet & Pest Experts</h1>
                  <p style="color: #a7f3d0; margin: 6px 0 0 0; font-size: 14px; font-weight: 500;">Bond Cleaning & Pest Management Specialists</p>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding: 32px 28px;">
                  <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">Thank You, ${firstName}!</h2>
                  <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                    We have successfully received your service enquiry for <strong style="color: #0f172a;">${service || 'Cleaning Services'}</strong>. Our dispatch team is currently checking real-time availability in your Brisbane area.
                  </p>

                  <!-- SUMMARY BOX -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 18px 20px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 13px; font-weight: 500;">Enquiry Ref:</td>
                            <td style="padding: 4px 0; color: #059669; font-size: 14px; font-weight: 700; text-align: right;">${enquiryNumber}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 13px; font-weight: 500;">Requested Service:</td>
                            <td style="padding: 4px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">${service || 'General Cleaning'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 13px; font-weight: 500;">Details:</td>
                            <td style="padding: 4px 0; color: #0f172a; font-size: 13px; text-align: right;">${message || 'Standard Request'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0; color: #64748b; font-size: 13px; font-weight: 500;">Status:</td>
                            <td style="padding: 4px 0; color: #d97706; font-size: 13px; font-weight: 700; text-align: right;">Priority Dispatch Review</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- GUARANTEE BADGE -->
                  <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 14px 16px; border-radius: 6px; margin-bottom: 24px;">
                    <p style="margin: 0; color: #065f46; font-size: 13px; font-weight: 600;">
                      🛡️ 100% Bond Back Guarantee: All end-of-lease cleans adhere strictly to Queensland RTA & REIQ real estate checklists with a 72-hour free warranty.
                    </p>
                  </div>

                  <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                    Need urgent assistance or have questions? Contact our dispatch line directly at <strong style="color: #059669;">0434 061 188</strong>.
                  </p>

                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center">
                        <a href="tel:0434061188" style="display: inline-block; background-color: #ea580c; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 9999px; box-shadow: 0 4px 10px rgba(234, 88, 12, 0.3);">
                          Call Dispatch: 0434 061 188
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="background-color: #f1f5f9; padding: 20px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">
                    Brisbane Carpet & Pest Experts · 192 Turton St, Sunnybank, QLD 4109, Brisbane, Australia
                  </p>
                  <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 11px;">
                    © ${new Date().getFullYear()} Brisbane Carpet & Pest Experts. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmailNotification({
    to: email,
    subject: `Enquiry Confirmation [${enquiryNumber}] - Brisbane Carpet & Pest Experts`,
    htmlContent: customerEmailHtml,
    recipientName: customerFullName,
  });

  // 2. Send Admin Alert Email (with customer reply-to)
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>New Enquiry</title></head>
    <body style="background-color: #0f172a; font-family: sans-serif; padding: 20px; color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
        <h2 style="color: #34d399; margin-top: 0;">🔔 New Cleaning Enquiry Received</h2>
        <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #334155;">
          <p style="margin: 0 0 8px 0;"><strong>Enquiry Reference:</strong> <span style="color: #fbbf24;">${enquiryNumber}</span></p>
          <p style="margin: 0 0 8px 0;"><strong>Customer:</strong> ${customerFullName}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #4ade80;">${phone}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Service:</strong> ${service || 'General Enquiry'}</p>
          <p style="margin: 0 0 8px 0;"><strong>Details / Notes:</strong> ${message || 'N/A'}</p>
          <p style="margin: 0;"><strong>IP Address:</strong> ${ipAddress || 'Unknown'}</p>
        </div>
        <p style="margin: 16px 0 0 0; font-size: 13px; color: #94a3b8;">Click 'Reply' directly in your email client to reply to the customer (${email}).</p>
      </div>
    </body>
    </html>
  `;

  await sendEmailNotification({
    to: adminEmail,
    subject: `[NEW LEAD] ${enquiryNumber} - ${customerFullName} (${service || 'Cleaning'})`,
    htmlContent: adminEmailHtml,
    recipientName: 'Admin Team',
    replyTo: email,
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
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Confirmed</title></head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding: 24px 12px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              <tr>
                <td style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); padding: 32px 28px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Brisbane Carpet & Pest Experts</h1>
                  <p style="color: #a7f3d0; margin: 6px 0 0 0; font-size: 14px;">Official Service Reservation</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 28px;">
                  <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px;">Your Booking Request is Confirmed!</h2>
                  <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                    Hi <strong>${customerName}</strong>, thank you for booking with Brisbane Carpet & Pest Experts. Here are your reservation details:
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 18px 20px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Booking Ref:</td>
                            <td style="padding: 6px 0; color: #059669; font-size: 14px; font-weight: bold; text-align: right;">${bookingNumber}</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Service:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">${serviceName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Service Address:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-size: 13px; text-align: right;">${serviceAddress}</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Scheduled Date:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-size: 13px; font-weight: 600; text-align: right;">${scheduledDate ? new Date(scheduledDate).toLocaleDateString('en-AU') : 'Flexible'} (${timeSlot || 'Anytime'})</td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Estimated Total:</td>
                            <td style="padding: 6px 0; color: #0f172a; font-size: 16px; font-weight: 800; text-align: right;">$${totalPrice.toFixed(2)} AUD</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                    Our field dispatch team is assigning your certified cleaning technician. If you need any adjustments, reply to this email or call <strong style="color: #059669;">0434 061 188</strong>.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f1f5f9; padding: 20px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">Brisbane Carpet & Pest Experts · 100% Satisfaction & Bond Back Guarantee</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmailNotification({
    to: customerEmail,
    subject: `Booking Confirmation [${bookingNumber}] - Brisbane Carpet & Pest Experts`,
    htmlContent: customerEmailHtml,
    recipientName: customerName,
  });

  // 2. Send Admin Alert Email (with customer reply-to)
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>New Booking</title></head>
    <body style="background-color: #0f172a; font-family: sans-serif; padding: 20px; color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
        <h2 style="color: #38bdf8; margin-top: 0;">🎉 New Booking Received: ${bookingNumber}</h2>
        <div style="background-color: #0f172a; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #334155;">
          <p style="margin: 0 0 8px 0;"><strong>Customer:</strong> ${customerName}</p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${customerEmail}" style="color: #38bdf8;">${customerEmail}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${customerPhone}" style="color: #4ade80;">${customerPhone}</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Service:</strong> ${serviceName}</p>
          <p style="margin: 0 0 8px 0;"><strong>Address:</strong> ${serviceAddress}</p>
          <p style="margin: 0 0 8px 0;"><strong>Schedule:</strong> ${scheduledDate || 'Flexible'} (${timeSlot || 'Anytime'})</p>
          <p style="margin: 0;"><strong>Estimated Total:</strong> <span style="color: #34d399; font-weight: bold;">$${totalPrice.toFixed(2)} AUD</span></p>
        </div>
        <p><a href="http://localhost:3000/admin/bookings" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">View Booking Dispatch Board →</a></p>
      </div>
    </body>
    </html>
  `;

  await sendEmailNotification({
    to: adminEmail,
    subject: `[NEW BOOKING] ${bookingNumber} - ${customerName} ($${totalPrice})`,
    htmlContent: adminEmailHtml,
    recipientName: 'Admin Team',
    replyTo: customerEmail,
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
