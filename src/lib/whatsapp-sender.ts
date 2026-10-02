import { prisma } from './prisma';

interface SendWhatsAppOptions {
  phone: string;
  message: string;
  templateName?: string;
  templateLanguage?: string;
  mediaUrl?: string;
}

interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  provider: 'meta_cloud' | 'twilio' | 'ultramsg' | 'simulated';
  error?: string;
}

/**
 * Fetch dynamic WhatsApp configuration from database SiteSetting
 */
async function getDynamicWhatsAppConfig() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { group: 'whatsapp' },
    });

    const config: Record<string, string> = {};
    settings.forEach((s) => {
      config[s.key] = s.value;
    });

    return {
      enabled: config.whatsapp_enabled !== 'false',
      provider: config.whatsapp_provider || 'meta_cloud', // 'meta_cloud', 'twilio', 'ultramsg'
      metaAccessToken: config.meta_access_token || process.env.META_ACCESS_TOKEN,
      metaPhoneNumberId: config.meta_phone_number_id || process.env.META_PHONE_NUMBER_ID,
      metaWabaId: config.meta_waba_id || process.env.META_WABA_ID,
      twilioAccountSid: config.twilio_account_sid || process.env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: config.twilio_auth_token || process.env.TWILIO_AUTH_TOKEN,
      twilioFromPhone: config.twilio_phone_number || process.env.TWILIO_PHONE_NUMBER,
      ultramsgInstanceId: config.ultramsg_instance_id || process.env.ULTRAMSG_INSTANCE_ID,
      ultramsgToken: config.ultramsg_token || process.env.ULTRAMSG_TOKEN,
      defaultCountryCode: config.whatsapp_country_code || '61', // Australia
    };
  } catch (err) {
    return {
      enabled: true,
      provider: 'meta_cloud',
      metaAccessToken: process.env.META_ACCESS_TOKEN,
      metaPhoneNumberId: process.env.META_PHONE_NUMBER_ID,
      metaWabaId: process.env.META_WABA_ID,
      twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
      twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
      twilioFromPhone: process.env.TWILIO_PHONE_NUMBER,
      ultramsgInstanceId: process.env.ULTRAMSG_INSTANCE_ID,
      ultramsgToken: process.env.ULTRAMSG_TOKEN,
      defaultCountryCode: '61',
    };
  }
}

/**
 * Clean Australian / International phone numbers to standard format (e.g. 614XXXXXXXX)
 */
export function formatPhoneNumber(phone: string, defaultCountry = '61'): string {
  let cleaned = phone.replace(/[^0-9]/g, '');

  // If starts with 04 (Australian mobile e.g. 0434061188), convert to 61434061188
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    cleaned = defaultCountry + cleaned.substring(1);
  }

  // If 9 digits (434061188), prepend 61
  if (cleaned.length === 9 && cleaned.startsWith('4')) {
    cleaned = defaultCountry + cleaned;
  }

  return cleaned;
}

/**
 * Dispatch real-time WhatsApp message via Meta Cloud API or Twilio
 */
export async function sendWhatsAppMessage({
  phone,
  message,
  templateName,
  templateLanguage = 'en_US',
  mediaUrl,
}: SendWhatsAppOptions): Promise<WhatsAppResult> {
  const config = await getDynamicWhatsAppConfig();
  const formattedPhone = formatPhoneNumber(phone, config.defaultCountryCode);

  let dispatchResult: WhatsAppResult = {
    success: false,
    provider: 'simulated',
  };

  // 1. Meta WhatsApp Cloud API (Official Facebook Graph API)
  if (config.metaAccessToken && config.metaPhoneNumberId) {
    try {
      const endpoint = `https://graph.facebook.com/v18.0/${config.metaPhoneNumberId}/messages`;

      let requestBody: any = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedPhone,
      };

      if (templateName) {
        requestBody.type = 'template';
        requestBody.template = {
          name: templateName,
          language: { code: templateLanguage },
        };
      } else {
        requestBody.type = 'text';
        requestBody.text = { preview_url: true, body: message };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.metaAccessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const resData = await res.json();

      if (res.ok && resData.messages?.[0]?.id) {
        dispatchResult = {
          success: true,
          messageId: resData.messages[0].id,
          provider: 'meta_cloud',
        };
        console.log(`[Meta WhatsApp] Sent message to ${formattedPhone}. ID: ${resData.messages[0].id}`);
      } else {
        console.error('[Meta WhatsApp API Error]:', resData?.error?.message || JSON.stringify(resData));
        dispatchResult.error = resData?.error?.message || 'Meta Cloud API error';
      }
    } catch (metaErr: any) {
      console.error('[Meta WhatsApp Exception]:', metaErr.message);
      dispatchResult.error = metaErr.message;
    }
  }

  // 2. Twilio WhatsApp API
  else if (config.twilioAccountSid && config.twilioAuthToken && config.twilioFromPhone) {
    try {
      const authHeader = 'Basic ' + Buffer.from(`${config.twilioAccountSid}:${config.twilioAuthToken}`).toString('base64');
      const params = new URLSearchParams();
      params.append('From', config.twilioFromPhone.startsWith('whatsapp:') ? config.twilioFromPhone : `whatsapp:${config.twilioFromPhone}`);
      params.append('To', `whatsapp:+${formattedPhone}`);
      params.append('Body', message);
      if (mediaUrl) params.append('MediaUrl', mediaUrl);

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.twilioAccountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader,
        },
        body: params.toString(),
      });

      const twilioData = await res.json();
      if (res.ok && twilioData.sid) {
        dispatchResult = {
          success: true,
          messageId: twilioData.sid,
          provider: 'twilio',
        };
      } else {
        dispatchResult.error = twilioData.message;
      }
    } catch (twErr: any) {
      dispatchResult.error = twErr.message;
    }
  }

  // 3. UltraMsg API
  else if (config.ultramsgInstanceId && config.ultramsgToken) {
    try {
      const res = await fetch(`https://api.ultramsg.com/${config.ultramsgInstanceId}/messages/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: config.ultramsgToken,
          to: formattedPhone,
          body: message,
        }),
      });
      const ultraData = await res.json();
      if (ultraData.sent === 'true' || ultraData.id) {
        dispatchResult = {
          success: true,
          messageId: ultraData.id?.toString(),
          provider: 'ultramsg',
        };
      }
    } catch (uErr: any) {
      dispatchResult.error = uErr.message;
    }
  }

  // 4. If no live API keys provided yet, simulate & log
  if (!dispatchResult.success && !dispatchResult.error) {
    console.log(`📱 [WhatsApp Simulator to +${formattedPhone}]: ${message}`);
    dispatchResult = {
      success: true,
      messageId: `sim-wa-${Date.now()}`,
      provider: 'simulated',
    };
  }

  // Save in database WhatsappLog
  await prisma.whatsappLog.create({
    data: {
      phone: formattedPhone,
      message,
      direction: 'OUTBOUND',
      status: dispatchResult.success ? 'SENT' : 'FAILED',
    },
  });

  return dispatchResult;
}
