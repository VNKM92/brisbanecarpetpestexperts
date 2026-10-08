import { prisma } from './prisma';
import { logActivity } from './activity-logger';
import { sendEmail } from './mailer';
import { sendWhatsAppMessage } from './whatsapp-sender';

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
// 2. MOBILE SMS & WHATSAPP BUSINESS DISPATCHER
// ----------------------------------------------------

interface SendSmsParams {
  phone: string;
  message: string;
  recipientName?: string;
}

export async function sendSmsNotification({
  phone,
  message,
  recipientName,
}: SendSmsParams): Promise<{ success: boolean; logId?: string }> {
  try {
    const result = await sendWhatsAppMessage({
      phone,
      message,
    });

    return { success: result.success, logId: result.messageId };
  } catch (err: any) {
    console.error('Failed to dispatch SMS/WhatsApp notification:', err);
    return { success: false };
  }
}

// ----------------------------------------------------
// 3. IN-APP / USER DASHBOARD NOTIFICATION
// ----------------------------------------------------

export async function createDashboardNotification({
  userId,
  roleTarget = 'CUSTOMER',
  title,
  message,
  type = 'INFO',
  link,
}: {
  userId?: string | null;
  roleTarget?: string;
  title: string;
  message: string;
  type?: string;
  link?: string;
}) {
  try {
    return await prisma.notification.create({
      data: {
        userId: userId || undefined,
        roleTarget,
        title,
        message,
        type,
        link,
        isRead: false,
      },
    });
  } catch (error) {
    console.error('Error creating dashboard notification:', error);
  }
}

// ----------------------------------------------------
// 4. HTML EMAIL TEMPLATES & WORKFLOW NOTIFICATIONS
// ----------------------------------------------------

const EMAIL_BASE_STYLE = `
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 620px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

function getEmailWrapper(title: string, bodyContent: string) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="background-color: #f1f5f9; padding: 24px 12px; margin: 0;">
    <div style="${EMAIL_BASE_STYLE}">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Brisbane Carpet & Pest Experts</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #93c5fd; text-transform: uppercase; letter-spacing: 1px;">Certified Cleaning & Pest Management</p>
      </div>

      <!-- Main Body -->
      <div style="padding: 30px 24px; color: #334155; line-height: 1.6; font-size: 15px;">
        ${bodyContent}
      </div>

      <!-- Footer -->
      <div style="background-color: #f8fafc; padding: 20px 24px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0 0 6px 0;">Brisbane, Queensland, Australia | ABN: 45 892 103 441</p>
        <p style="margin: 0 0 6px 0;">Phone: <a href="tel:0434061188" style="color: #2563eb; text-decoration: none; font-weight: 600;">0434 061 188</a> | Email: info@brisbanecarpetpestexperts.com.au</p>
        <p style="margin: 0; color: #94a3b8;">© ${new Date().getFullYear()} Brisbane Carpet & Pest Experts. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Handle Inbound Booking from Public Site
 */
export async function handleInboundBookingNotification(params: {
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
  const adminEmail = process.env.ADMIN_EMAIL || 'info@brisbanecarpetpestexperts.com.au';

  await sendEmailNotification({
    to: params.customerEmail,
    subject: `Booking Request Confirmation #${params.bookingNumber} - Brisbane Carpet & Pest Experts`,
    htmlContent: getEmailWrapper(
      'Booking Request Received',
      `<h2>Hi ${params.customerName},</h2>
       <p>We received your booking for <strong>${params.serviceName}</strong>. Our team is scheduling your service.</p>
       <p><strong>Ref:</strong> ${params.bookingNumber} | <strong>Location:</strong> ${params.serviceAddress}</p>`
    ),
    recipientName: params.customerName,
  });

  await createDashboardNotification({
    roleTarget: 'ADMIN',
    title: `New Booking #${params.bookingNumber}`,
    message: `${params.customerName} booked ${params.serviceName}`,
    type: 'QUOTE',
    link: '/admin/quotations',
  });

  await logActivity({
    userName: params.customerName,
    action: 'CREATE',
    module: 'Bookings',
    entityId: params.bookingId,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    details: { bookingNumber: params.bookingNumber, service: params.serviceName },
  });
}

/**
 * Handle Inbound Enquiry from Contact Form
 */
export async function handleInboundEnquiryNotification(params: {
  enquiryId: string;
  enquiryNumber: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const fullName = `${params.firstName} ${params.lastName || ''}`.trim();

  await sendEmailNotification({
    to: params.email,
    subject: `Enquiry Received #${params.enquiryNumber} - Brisbane Carpet & Pest Experts`,
    htmlContent: getEmailWrapper(
      'Enquiry Received',
      `<h2>Hi ${fullName},</h2>
       <p>Thank you for contacting us regarding <strong>${params.service || 'Cleaning Services'}</strong>. Our specialist will reach out shortly.</p>`
    ),
    recipientName: fullName,
  });

  await createDashboardNotification({
    roleTarget: 'ADMIN',
    title: `New Customer Enquiry #${params.enquiryNumber}`,
    message: `${fullName} inquired about ${params.service || 'Services'}`,
    type: 'ENQUIRY',
    link: `/admin/enquiries?id=${params.enquiryId}`,
  });

  await logActivity({
    userName: fullName,
    action: 'CREATE',
    module: 'Enquiries',
    entityId: params.enquiryId,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    details: { enquiryNumber: params.enquiryNumber, email: params.email },
  });
}

/**
 * Notification when customer submits a demand quotation
 */
export async function notifyQuotationSubmitted(booking: any) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const customerHtml = getEmailWrapper(
    'Quotation Request Received',
    `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Hi ${booking.customerName},</h2>
    <p>Thank you for submitting your service requirement for <strong>${booking.serviceName}</strong>. Our expert team is reviewing your details.</p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0 0 6px 0;"><strong>Quotation ID:</strong> ${booking.bookingNumber}</p>
      <p style="margin: 0 0 6px 0;"><strong>Requested Date:</strong> ${booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Flexible'}</p>
      <p style="margin: 0 0 6px 0;"><strong>Time Slot:</strong> ${booking.timeSlot || 'During Business Hours'}</p>
      <p style="margin: 0;"><strong>Location:</strong> ${booking.serviceAddress}</p>
    </div>

    <p><strong>What's Next?</strong><br/>Super Admin will review and approve your quotation estimate. Once approved, you will be invited to confirm your booking with a quick <strong>$50 AUD refundable deposit</strong>.</p>
    
    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/dashboard" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Track in Customer Dashboard</a>
    </div>
    `
  );

  await sendEmailNotification({
    to: booking.customerEmail,
    subject: `📋 Quotation Request Received [${booking.bookingNumber}] - Brisbane Carpet & Pest Experts`,
    htmlContent: customerHtml,
    recipientName: booking.customerName,
  });

  await createDashboardNotification({
    roleTarget: 'ADMIN',
    title: `New Quotation Demand: ${booking.bookingNumber}`,
    message: `${booking.customerName} requested a quotation for ${booking.serviceName} (${booking.serviceAddress})`,
    type: 'QUOTE',
    link: `/admin/quotations`,
  });
}

/**
 * Notification when Super Admin APPROVES quotation with Price & $50 Deposit request
 */
export async function notifyQuotationApproved(booking: any) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const payUrl = `${siteUrl}/dashboard?tab=quotations&payBookingId=${booking.id}`;

  const customerHtml = getEmailWrapper(
    'Quotation Approved - Pay $50 Deposit to Confirm',
    `
    <div style="background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
      <span style="font-size: 24px;">🎉</span>
      <h2 style="color: #065f46; margin: 6px 0 0 0; font-size: 20px;">Your Quotation Has Been Approved!</h2>
    </div>

    <p>Hi ${booking.customerName},</p>
    <p>Great news! Our Super Admin has evaluated and approved your quotation request for <strong>${booking.serviceName}</strong>.</p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Quotation Ref:</td>
          <td style="padding: 6px 0; font-weight: 600; text-align: right;">${booking.bookingNumber}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Approved Total Price:</td>
          <td style="padding: 6px 0; font-weight: 700; color: #0f172a; font-size: 16px; text-align: right;">$${Number(booking.approvedPrice || booking.totalPrice).toFixed(2)} AUD</td>
        </tr>
        <tr style="border-top: 1px dashed #cbd5e1; border-bottom: 1px dashed #cbd5e1;">
          <td style="padding: 10px 0; font-weight: 700; color: #2563eb;">Booking Deposit Required:</td>
          <td style="padding: 10px 0; font-weight: 700; color: #2563eb; font-size: 18px; text-align: right;">$${Number(booking.depositRequired || 50).toFixed(2)} AUD</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Scheduled Date:</td>
          <td style="padding: 6px 0; font-weight: 600; text-align: right;">${booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'To be confirmed'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;">Time Window:</td>
          <td style="padding: 6px 0; font-weight: 600; text-align: right;">${booking.timeSlot || 'Business Hours'}</td>
        </tr>
      </table>
    </div>

    ${booking.adminNotes ? `<p style="font-size: 13px; color: #475569; background: #eff6ff; padding: 10px 14px; border-radius: 6px;"><strong>Admin Note:</strong> ${booking.adminNotes}</p>` : ''}

    <p style="text-align: center; margin: 25px 0 10px 0;">
      <a href="${payUrl}" style="background-color: #10b981; color: #ffffff; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">💳 Pay $${booking.depositRequired || 50} Deposit & Confirm Booking</a>
    </p>
    <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 6px;">Supported: Stripe (Card / Apple Pay / GPay), PayPal, PayID, Australian Bank Transfer</p>
    `
  );

  await sendEmailNotification({
    to: booking.customerEmail,
    subject: `✅ Quotation Approved: Pay $${booking.depositRequired || 50} Deposit to Lock in Date [${booking.bookingNumber}]`,
    htmlContent: customerHtml,
    recipientName: booking.customerName,
  });

  if (booking.customerPhone) {
    await sendSmsNotification({
      phone: booking.customerPhone,
      message: `Hi ${booking.customerName}, your quotation #${booking.bookingNumber} for ${booking.serviceName} has been APPROVED for $${booking.approvedPrice || booking.totalPrice} AUD. Pay $${booking.depositRequired || 50} AUD deposit now to lock in your date: ${payUrl}`,
      recipientName: booking.customerName,
    });
  }

  await createDashboardNotification({
    userId: booking.customer?.userId || null,
    roleTarget: 'CUSTOMER',
    title: 'Quotation Approved!',
    message: `Quotation #${booking.bookingNumber} is approved ($${booking.approvedPrice || booking.totalPrice} AUD). Click to pay $${booking.depositRequired || 50} deposit and lock in your service.`,
    type: 'SUCCESS',
    link: `/dashboard?tab=quotations&payBookingId=${booking.id}`,
  });
}

/**
 * Notification when $50 Deposit is paid and booking confirmed
 */
export async function notifyDepositPaid(booking: any, payment: any) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const customerHtml = getEmailWrapper(
    'Booking Confirmed - Deposit Payment Received',
    `
    <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
      <h2 style="color: #15803d; margin: 0; font-size: 20px;">🔒 Booking Confirmed!</h2>
      <p style="color: #166534; margin: 4px 0 0 0; font-size: 14px;">Deposit payment of $${Number(payment.amount).toFixed(2)} AUD received successfully.</p>
    </div>

    <p>Hi ${booking.customerName},</p>
    <p>Your booking for <strong>${booking.serviceName}</strong> has been officially confirmed on our schedule.</p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
      <p style="margin: 0 0 6px 0;"><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
      <p style="margin: 0 0 6px 0;"><strong>Transaction ID:</strong> ${payment.transactionNumber} (${payment.paymentGateway})</p>
      <p style="margin: 0 0 6px 0;"><strong>Service Date:</strong> ${booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Confirmed'}</p>
      <p style="margin: 0 0 6px 0;"><strong>Service Address:</strong> ${booking.serviceAddress}</p>
      <p style="margin: 0 0 6px 0;"><strong>Deposit Paid:</strong> <span style="color: #15803d; font-weight: 700;">$${Number(payment.amount).toFixed(2)} AUD</span></p>
      <p style="margin: 0;"><strong>Remaining Balance:</strong> $${Number(booking.balanceDue || 0).toFixed(2)} AUD (Payable on completion)</p>
    </div>

    <p><strong>Reminder Alert:</strong> We will send you an automated reminder <strong>2 days before your service</strong> via Email, SMS & your Dashboard.</p>

    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/dashboard?tab=bookings" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View Booking & Invoice</a>
    </div>
    `
  );

  await sendEmailNotification({
    to: booking.customerEmail,
    subject: `🔒 Booking Confirmed #${booking.bookingNumber} - Brisbane Carpet & Pest Experts`,
    htmlContent: customerHtml,
    recipientName: booking.customerName,
  });

  if (booking.customerPhone) {
    await sendSmsNotification({
      phone: booking.customerPhone,
      message: `Confirmed! Booking #${booking.bookingNumber} for ${booking.serviceName} on ${new Date(booking.scheduledDate).toLocaleDateString('en-AU')}. Deposit received $${payment.amount} AUD. We will remind you 2 days prior.`,
      recipientName: booking.customerName,
    });
  }

  await createDashboardNotification({
    userId: booking.customer?.userId || null,
    roleTarget: 'CUSTOMER',
    title: 'Booking Confirmed!',
    message: `Your booking #${booking.bookingNumber} has been locked in. Deposit $${payment.amount} AUD received.`,
    type: 'SUCCESS',
    link: `/dashboard?tab=bookings`,
  });

  await createDashboardNotification({
    roleTarget: 'ADMIN',
    title: `Payment Received: $${payment.amount} AUD`,
    message: `Customer ${booking.customerName} paid $${payment.amount} AUD deposit for #${booking.bookingNumber} via ${payment.paymentGateway}.`,
    type: 'PAYMENT',
    link: `/admin/bookings`,
  });
}

/**
 * 2-DAY PRE-BOOKING AUTOMATED REMINDER
 */
export async function send2DayPreBookingReminder(booking: any) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const serviceDateFormatted = booking.scheduledDate
    ? new Date(booking.scheduledDate).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'in 2 days';

  const customerHtml = getEmailWrapper(
    'Upcoming Service Reminder (2 Days Away)',
    `
    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center;">
      <span style="font-size: 26px;">⏰</span>
      <h2 style="color: #1e40af; margin: 6px 0 0 0; font-size: 20px;">Your Service is in 2 Days!</h2>
      <p style="color: #1d4ed8; margin: 4px 0 0 0; font-size: 14px;">Scheduled for ${serviceDateFormatted}</p>
    </div>

    <p>Hi ${booking.customerName},</p>
    <p>This is a friendly reminder that our specialist is scheduled to visit your property in <strong>2 days</strong> for <strong>${booking.serviceName}</strong>.</p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 20px 0;">
      <p style="margin: 0 0 6px 0;"><strong>Booking Ref:</strong> ${booking.bookingNumber}</p>
      <p style="margin: 0 0 6px 0;"><strong>Date:</strong> ${serviceDateFormatted}</p>
      <p style="margin: 0 0 6px 0;"><strong>Arrival Window:</strong> ${booking.timeSlot || 'Morning (8AM - 11AM)'}</p>
      <p style="margin: 0 0 6px 0;"><strong>Service Location:</strong> ${booking.serviceAddress}</p>
      ${booking.assignedEmployee ? `<p style="margin: 0 0 6px 0;"><strong>Assigned Specialist:</strong> ${booking.assignedEmployee.name} (${booking.assignedEmployee.designation})</p>` : ''}
      <p style="margin: 0;"><strong>Remaining Balance on Completion:</strong> $${Number(booking.balanceDue || 0).toFixed(2)} AUD</p>
    </div>

    <div style="text-align: center; margin-top: 25px;">
      <a href="${siteUrl}/dashboard?tab=bookings" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Manage Booking in Dashboard</a>
    </div>
    `
  );

  if (booking.reminderEmailOpt !== false) {
    await sendEmailNotification({
      to: booking.customerEmail,
      subject: `⏰ 2-Day Reminder: ${booking.serviceName} on ${serviceDateFormatted} [${booking.bookingNumber}]`,
      htmlContent: customerHtml,
      recipientName: booking.customerName,
    });
  }

  if (booking.customerPhone && booking.reminderMobileOpt !== false) {
    await sendSmsNotification({
      phone: booking.customerPhone,
      message: `Friendly Reminder: Brisbane Carpet & Pest Experts will visit you in 2 days on ${serviceDateFormatted} (${booking.timeSlot || 'Business Hours'}) at ${booking.serviceAddress} for ${booking.serviceName}. Ref: #${booking.bookingNumber}. Contact 0434 061 188 for changes.`,
      recipientName: booking.customerName,
    });
  }

  await createDashboardNotification({
    userId: booking.customer?.userId || null,
    roleTarget: 'CUSTOMER',
    title: '⏰ 2-Day Service Reminder',
    message: `Your ${booking.serviceName} is scheduled in 2 days (${serviceDateFormatted}, ${booking.timeSlot || 'Morning'}). Please check your preparation checklist.`,
    type: 'REMINDER',
    link: `/dashboard?tab=bookings`,
  });

  await prisma.reminderLog.create({
    data: {
      bookingId: booking.id,
      recipientEmail: booking.customerEmail,
      recipientPhone: booking.customerPhone,
      channel: 'ALL',
      scheduledFor: new Date(),
      sentAt: new Date(),
      status: 'SENT',
    },
  });

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      reminderSent2Days: true,
      reminderSentDate: new Date(),
    },
  });
}
