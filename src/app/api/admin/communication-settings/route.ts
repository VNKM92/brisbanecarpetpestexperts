import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { sendEmail } from '@/lib/mailer';
import { sendWhatsAppMessage } from '@/lib/whatsapp-sender';

// Default Email & WhatsApp Configuration
const DEFAULT_COMMUNICATION_CONFIG = {
  // Email Settings
  email_provider: 'smtp', // 'smtp', 'gmail', 'resend', 'sendgrid'
  smtp_host: 'smtp.gmail.com',
  smtp_port: '587',
  smtp_user: 'info@brisbanecarpetpestexperts.com.au',
  smtp_pass: '',
  smtp_secure: 'false',
  gmail_user: '',
  gmail_app_password: '',
  resend_api_key: '',
  sendgrid_api_key: '',
  email_from: 'Brisbane Carpet & Pest Experts <info@brisbanecarpetpestexperts.com.au>',
  admin_notification_email: 'info@brisbanecarpetpestexperts.com.au',

  // WhatsApp & SMS Settings
  whatsapp_enabled: 'true',
  whatsapp_provider: 'meta_cloud', // 'meta_cloud', 'twilio', 'ultramsg'
  meta_access_token: '',
  meta_phone_number_id: '',
  meta_waba_id: '',
  meta_template_name: 'hello_world',
  twilio_account_sid: '',
  twilio_auth_token: '',
  twilio_phone_number: '+14155238886',
  ultramsg_instance_id: '',
  ultramsg_token: '',
  whatsapp_country_code: '61', // Australia
  whatsapp_business_phone: '0434 061 188',
};

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const settings = await prisma.siteSetting.findMany({
      where: {
        OR: [{ group: 'email' }, { group: 'whatsapp' }],
      },
    });

    const configMap: Record<string, string> = { ...DEFAULT_COMMUNICATION_CONFIG };
    settings.forEach((s) => {
      configMap[s.key] = s.value;
    });

    return NextResponse.json({
      success: true,
      data: configMap,
    });
  } catch (error: any) {
    console.error('Error fetching communication settings:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const updatedKeys: string[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        const group = key.startsWith('whatsapp') || key.startsWith('meta_') || key.startsWith('twilio_') || key.startsWith('ultramsg_')
          ? 'whatsapp'
          : 'email';

        await prisma.siteSetting.upsert({
          where: { key },
          update: {
            value: String(value),
            group,
          },
          create: {
            key,
            value: String(value),
            group,
            label: key.replace(/_/g, ' ').toUpperCase(),
          },
        });
        updatedKeys.push(key);
      }
    }

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'SETTINGS_CHANGE',
      module: 'Communications',
      details: {
        keysCount: updatedKeys.length,
        updatedKeys,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Email & WhatsApp API settings updated successfully!',
    });
  } catch (error: any) {
    console.error('Error saving communication settings:', error);
    return NextResponse.json({ success: false, message: error.message || 'Failed to save settings' }, { status: 500 });
  }
}

/**
 * PUT: Dispatch Instant Live Test (Email or WhatsApp)
 */
export async function PUT(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { testType, recipientEmail, recipientPhone, subject, message } = body;

    // Test Email Dispatch
    if (testType === 'email') {
      if (!recipientEmail) {
        return NextResponse.json({ success: false, message: 'Recipient email is required' }, { status: 400 });
      }

      const emailResult = await sendEmail({
        to: recipientEmail,
        subject: subject || '🧪 Live Test Email - Brisbane Carpet & Pest Experts',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 10px;">
            <h2 style="color: #2563eb;">✅ Live Email Gateway Test Successful!</h2>
            <p>This email confirms that your Email Gateway (SMTP / Gmail / Resend) is configured and dispatching messages properly.</p>
            <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px;">
              <p style="margin: 0 0 6px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString('en-AU')}</p>
              <p style="margin: 0;"><strong>Sent By:</strong> ${authUser.name} (${authUser.email})</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({
        success: emailResult.success,
        message: emailResult.success
          ? `Test email sent successfully via [${emailResult.mode.toUpperCase()}]!`
          : `Email delivery failed: ${emailResult.error || 'Check your SMTP credentials'}`,
        data: emailResult,
      });
    }

    // Test WhatsApp Dispatch
    if (testType === 'whatsapp') {
      if (!recipientPhone) {
        return NextResponse.json({ success: false, message: 'Recipient phone number is required' }, { status: 400 });
      }

      const testMsg = message || `🧪 Test WhatsApp message from Brisbane Carpet & Pest Experts at ${new Date().toLocaleTimeString('en-AU')}. Gateway is operational!`;
      const waResult = await sendWhatsAppMessage({
        phone: recipientPhone,
        message: testMsg,
      });

      return NextResponse.json({
        success: waResult.success,
        message: waResult.success
          ? `WhatsApp message delivered successfully via [${waResult.provider.toUpperCase()}]!`
          : `WhatsApp delivery failed: ${waResult.error || 'Check Meta Cloud Token or Twilio Auth'}`,
        data: waResult,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid test type' }, { status: 400 });
  } catch (error: any) {
    console.error('Error sending test communication:', error);
    return NextResponse.json({ success: false, message: error.message || 'Test dispatch error' }, { status: 500 });
  }
}
