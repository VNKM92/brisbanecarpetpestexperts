import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

interface MailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  mode: 'smtp' | 'resend' | 'development-simulated';
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
    return cachedTransporter;
  }

  // Check if Gmail specific environment variables are set
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;
  if (gmailUser && gmailPass) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
    return cachedTransporter;
  }

  return null;
}

/**
 * Enterprise Production Mail Dispatcher
 * Automatically dispatches via configured free SMTP (Gmail, Brevo, Mailtrap, Hostinger, cPanel)
 * or Resend API if provided, with seamless graceful fallback.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
  from,
}: SendMailOptions): Promise<MailResult> {
  const fromAddress =
    from ||
    process.env.SMTP_FROM ||
    process.env.EMAIL_FROM ||
    `"Brisbane Carpet & Pest Experts" <${process.env.SMTP_USER || 'info@brisbanecarpetpestexperts.com.au'}>`;

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  // 1. Attempt NodeMailer SMTP
  const transporter = getTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipients,
        subject,
        html,
        text: text || html.replace(/<[^>]*>?/gm, ''),
        replyTo: replyTo || (Array.isArray(to) ? to[0] : to),
      });

      console.log(`[SMTP Mailer] Successfully sent email to ${recipients}. MessageId: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId,
        mode: 'smtp',
      };
    } catch (smtpError: any) {
      console.error('[SMTP Mailer Error] Failed sending via SMTP:', smtpError?.message || smtpError);
      // Fall through to other methods if available
    }
  }

  // 2. Attempt Resend API if RESEND_API_KEY is present
  const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
  if (resendApiKey) {
    try {
      const cleanFrom = process.env.EMAIL_FROM || 'Brisbane Carpet & Pest Experts <onboarding@resend.dev>';
      const toList = Array.isArray(to) ? to : [to];

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: cleanFrom,
          to: toList,
          subject,
          html,
          text,
          reply_to: replyTo,
        }),
      });

      if (res.ok) {
        const resData = await res.json();
        console.log(`[Resend Mailer] Email sent to ${recipients}. ID: ${resData?.id}`);
        return {
          success: true,
          messageId: resData?.id,
          mode: 'resend',
        };
      } else {
        const errText = await res.text();
        console.error('[Resend Mailer Error]:', errText);
      }
    } catch (apiError: any) {
      console.error('[Resend API Error]:', apiError?.message || apiError);
    }
  }

  // 3. Graceful Local / Development fallback (Simulated dispatch with console preview)
  console.log('----------------------------------------------------');
  console.log('📨 [EMAIL NOTIFICATION DISPATCHED - DEVELOPMENT SIMULATOR]');
  console.log(`To: ${recipients}`);
  console.log(`From: ${fromAddress}`);
  console.log(`Subject: ${subject}`);
  console.log(`Reply-To: ${replyTo || 'N/A'}`);
  console.log('Tip: Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env to send live emails.');
  console.log('----------------------------------------------------');

  return {
    success: true,
    messageId: `dev-sim-${Date.now()}`,
    mode: 'development-simulated',
  };
}
