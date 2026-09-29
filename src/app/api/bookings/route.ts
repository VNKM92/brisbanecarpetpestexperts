import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { checkRateLimit, getClientInfo, sanitizeString } from '@/lib/security';
import { handleInboundBookingNotification } from '@/lib/notifications';

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Customer name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(6, 'Valid phone number is required'),
  serviceName: z.string().default('General Cleaning'),
  serviceAddress: z.string().default('Brisbane, QLD'),
  scheduledDate: z.string().optional(),
  timeSlot: z.string().optional().default('During Business Hours'),
  squareFootage: z.number().optional().default(800),
  rooms: z.number().optional().default(1),
  bathrooms: z.number().optional().default(1),
  addons: z.any().optional(),
  totalPrice: z.number().min(0).default(0),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(request, 15, 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many booking requests. Please wait a moment before trying again.',
      },
      { status: 429 }
    );
  }

  const { ipAddress, userAgent } = getClientInfo(request);

  try {
    const rawBody = await request.json();
    const validated = bookingSchema.parse(rawBody);

    const customerName = sanitizeString(validated.customerName);
    const customerEmail = validated.customerEmail.toLowerCase().trim();
    const customerPhone = sanitizeString(validated.customerPhone);
    const serviceName = sanitizeString(validated.serviceName) || 'General Cleaning';
    const serviceAddress = sanitizeString(validated.serviceAddress) || 'Brisbane, QLD';
    const timeSlot = sanitizeString(validated.timeSlot) || 'During Business Hours';
    const notes = sanitizeString(validated.notes);

    // 2. Upsert Customer Record
    const customer = await prisma.customer.upsert({
      where: { email: customerEmail },
      update: {
        name: customerName,
        phone: customerPhone,
        address: serviceAddress,
      },
      create: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: serviceAddress,
      },
    });

    // 3. Generate Reference Numbers
    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const addonsString = validated.addons ? JSON.stringify(validated.addons) : null;
    const scheduledDate = validated.scheduledDate ? new Date(validated.scheduledDate) : null;

    // 4. Save Booking in SQL Database
    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        customerName,
        customerEmail,
        customerPhone,
        serviceName,
        serviceAddress,
        scheduledDate,
        timeSlot,
        squareFootage: validated.squareFootage,
        rooms: validated.rooms,
        bathrooms: validated.bathrooms,
        addons: addonsString,
        totalPrice: validated.totalPrice,
        status: 'PENDING',
        notes,
      },
    });

    // 5. Create Matching Order & GST Breakdown
    const taxAmount = Math.round(validated.totalPrice * 0.1 * 100) / 100;
    await prisma.order.create({
      data: {
        orderNumber,
        bookingId: booking.id,
        customerId: customer.id,
        subtotal: validated.totalPrice - taxAmount,
        discount: 0,
        tax: taxAmount,
        totalAmount: validated.totalPrice,
        paymentStatus: 'UNPAID',
        paymentMethod: 'INVOICE',
      },
    });

    // 6. Execute Notification Pipeline (Customer Email, Admin Email, WhatsApp, Activity Log, Admin Alert)
    await handleInboundBookingNotification({
      bookingId: booking.id,
      bookingNumber,
      customerName,
      customerEmail,
      customerPhone,
      serviceName,
      serviceAddress,
      scheduledDate: validated.scheduledDate,
      timeSlot,
      totalPrice: validated.totalPrice,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Booking request created successfully! Your booking reference is ${bookingNumber}. Our dispatch manager is assigning your team.`,
        data: {
          bookingNumber,
          bookingId: booking.id,
          orderNumber,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking submission error:', error);
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
        message: 'Failed to process booking. Please try again or call 0434 061 188.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ success: true, data: bookings });
}
