import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

// Default payment configurations
const DEFAULT_PAYMENT_CONFIG = {
  // Stripe (Australia Card, Apple Pay, Google Pay)
  stripe_enabled: 'true',
  stripe_mode: 'test', // 'test' or 'live'
  stripe_publishable_key: 'pk_test_51NxSAMPLE_AU_KEY_00192837465',
  stripe_secret_key: 'sk_test_51NxSAMPLE_AU_SECRET_881928374',
  stripe_webhook_secret: 'whsec_sample_stripe_au_webhook_key',
  stripe_currency: 'AUD',

  // PayPal Australia
  paypal_enabled: 'true',
  paypal_mode: 'sandbox', // 'sandbox' or 'live'
  paypal_client_id: 'AZ_sample_paypal_au_client_id_9921',
  paypal_secret: 'EL_sample_paypal_au_secret_key_8812',

  // Australian PayID & NPP (New Payments Platform)
  payid_enabled: 'true',
  payid_type: 'Email', // 'Email', 'Mobile', 'ABN'
  payid_identifier: 'info@brisbanecarpetpestexperts.com.au',
  payid_account_name: 'Brisbane Carpet & Pest Experts Pty Ltd',
  payid_bsb: '084-004',
  payid_account_number: '12-345-6789',
  payid_instructions: 'Pay instantly from any Australian bank app using Osko / PayID with zero processing fees.',

  // POLi Payments (Australia & NZ)
  poli_enabled: 'true',
  poli_merchant_code: 'POLI_AU_BCPE_4000',
  poli_auth_code: 'AUTH_KEY_SAMPLE_POLI_8829',

  // Afterpay Australia / Zip
  afterpay_enabled: 'true',
  afterpay_merchant_id: 'AFTERPAY_AU_MERCHANT_99182',
  afterpay_secret_key: 'sk_afterpay_sample_secret_key',

  // Direct Australian Bank Transfer (EFT)
  bank_transfer_enabled: 'true',
  bank_name: 'National Australia Bank (NAB) / Commonwealth Bank',
  bank_account_name: 'Brisbane Carpet & Pest Experts',
  bank_bsb: '084-004',
  bank_account_number: '987654321',
  bank_instructions: 'Please include your Booking Reference (e.g. BK-XXXX) in the payment description.',

  // Deposit & Booking Policy
  deposit_amount_default: '50.00',
  deposit_currency: 'AUD',
  deposit_refundable: 'true',
  deposit_auto_confirm: 'true',
  deposit_policy_note: 'Standard refundable $50 AUD deposit to lock in certified specialist arrival date and time slot.',
};

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    // Fetch stored settings from DB
    const settings = await prisma.siteSetting.findMany({
      where: { group: 'payment' },
    });

    const configMap: Record<string, string> = { ...DEFAULT_PAYMENT_CONFIG };
    settings.forEach((s) => {
      configMap[s.key] = s.value;
    });

    return NextResponse.json({
      success: true,
      data: configMap,
    });
  } catch (error: any) {
    console.error('Error fetching payment settings:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden: Super Admin only' }, { status: 403 });
    }

    const body = await request.json();

    // Save each key into SiteSetting
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        await prisma.siteSetting.upsert({
          where: { key },
          update: {
            value: String(value),
            group: 'payment',
          },
          create: {
            key,
            value: String(value),
            group: 'payment',
            label: key.replace(/_/g, ' ').toUpperCase(),
          },
        });
      }
    }

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'SETTINGS_CHANGE',
      module: 'PaymentGateways',
      details: {
        updatedKeys: Object.keys(body),
        stripeMode: body.stripe_mode,
        depositAmount: body.deposit_amount_default,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment gateway settings and API keys updated successfully!',
    });
  } catch (error: any) {
    console.error('Error updating payment settings:', error);
    return NextResponse.json({ success: false, message: 'Failed to update payment settings' }, { status: 500 });
  }
}
