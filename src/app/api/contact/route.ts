import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkRateLimit, getClientInfo, sanitizeString } from '@/lib/security';
import { handleInboundEnquiryNotification } from '@/lib/notifications';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional().default(''),
  name: z.string().optional(),
  email: z.string().email('A valid email address is required'),
  phone: z.string().min(6, 'A valid phone number is required'),
  service: z.string().optional().default('Bond Cleaning Brisbane'),
  suburb: z.string().optional().default(''),
  bedrooms: z.string().optional().default(''),
  bathrooms: z.string().optional().default(''),
  preferredDate: z.string().optional().default(''),
  message: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(request, 15, 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many requests submitted. Please wait a minute and try again.',
      },
      { status: 429 }
    );
  }

  const { ipAddress, userAgent } = getClientInfo(request);

  try {
    const rawBody = await request.json();

    // Support unified 'name' field if single input was sent
    if (rawBody.name && !rawBody.firstName) {
      const parts = rawBody.name.trim().split(' ');
      rawBody.firstName = parts[0];
      rawBody.lastName = parts.slice(1).join(' ') || '';
    }

    // 2. Data Validation & Sanitization
    const validated = contactSchema.parse(rawBody);

    const firstName = sanitizeString(validated.firstName);
    const lastName = sanitizeString(validated.lastName);
    const email = validated.email.toLowerCase().trim();
    const phone = sanitizeString(validated.phone);
    const service = sanitizeString(validated.service) || 'Bond Cleaning Brisbane';
    const suburb = sanitizeString(validated.suburb);
    const bedrooms = sanitizeString(validated.bedrooms);
    const bathrooms = sanitizeString(validated.bathrooms);
    const preferredDate = sanitizeString(validated.preferredDate);
    const rawMessage = sanitizeString(validated.message);

    // Assemble rich structured message note
    const structuredNotes = [
      suburb ? `Suburb: ${suburb}` : null,
      preferredDate ? `Preferred Date: ${preferredDate}` : null,
      rawMessage ? `Notes: ${rawMessage}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const fullMessage = structuredNotes || rawMessage || 'Enquiry submitted from Contact page';

    // 3. Generate Reference Number
    const enquiryNumber = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Save Enquiry in Database
    const enquiry = await prisma.enquiry.create({
      data: {
        enquiryNumber,
        firstName,
        lastName,
        email,
        phone,
        service,
        bedrooms,
        bathrooms,
        message: fullMessage,
        status: 'NEW',
        ipAddress,
      },
    });

    // 5. Auto-upsert Customer Record in SQL
    const fullCustomerAddress = suburb ? `${suburb}, Brisbane QLD` : 'Brisbane, QLD';
    await prisma.customer.upsert({
      where: { email },
      update: {
        name: `${firstName} ${lastName}`.trim(),
        phone,
        address: fullCustomerAddress,
      },
      create: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        address: fullCustomerAddress,
      },
    });

    // 6. Execute Notification Pipeline (Customer Email, Admin Email, WhatsApp, Activity Log, Admin Alert)
    await handleInboundEnquiryNotification({
      enquiryId: enquiry.id,
      enquiryNumber,
      firstName,
      lastName,
      email,
      phone,
      service,
      message: fullMessage,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Thank you! Your enquiry has been received. Your reference number is ${enquiryNumber}. Our team will contact you shortly.`,
        data: {
          id: enquiry.id,
          enquiryNumber,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0]?.message || 'Validation error',
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process your enquiry. Please try again or call 0434 061 188.',
      },
      { status: 500 }
    );
  }
}
