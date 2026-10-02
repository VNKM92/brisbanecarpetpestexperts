import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { notifyQuotationSubmitted } from '@/lib/notifications';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Find customer quotations by userId or email
    const quotations = await prisma.booking.findMany({
      where: {
        OR: [
          { customerEmail: authUser.email },
          ...(authUser.customerId ? [{ customerId: authUser.customerId }] : []),
        ],
      },
      include: {
        customer: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            phone: true,
            designation: true,
          },
        },
        jobReport: {
          include: {
            photos: true,
          },
        },
        invoices: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: quotations,
    });
  } catch (error: any) {
    console.error('Error fetching customer quotations:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch quotations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    const body = await request.json();

    const {
      serviceId,
      serviceName,
      serviceAddress,
      suburb,
      postcode,
      scheduledDate,
      timeSlot,
      rooms,
      bathrooms,
      squareFootage,
      addons,
      notes,
      customerName,
      customerEmail,
      customerPhone,
      reminderMobileOpt,
      reminderEmailOpt,
    } = body;

    const email = authUser?.email || customerEmail;
    const name = authUser?.name || customerName;
    const phone = authUser?.phone || customerPhone || '';

    if (!serviceName || !serviceAddress) {
      return NextResponse.json(
        { success: false, message: 'Service name and address are required' },
        { status: 400 }
      );
    }

    // Find or create customer
    let customer = null;
    if (email) {
      customer = await prisma.customer.upsert({
        where: { email: email.toLowerCase().trim() },
        update: {
          name: name || undefined,
          phone: phone || undefined,
          address: serviceAddress || undefined,
          suburb: suburb || undefined,
          postcode: postcode || undefined,
          userId: authUser?.userId || undefined,
        },
        create: {
          name: name || 'Valued Customer',
          email: email.toLowerCase().trim(),
          phone: phone || null,
          address: serviceAddress || null,
          suburb: suburb || null,
          postcode: postcode || null,
          userId: authUser?.userId || null,
        },
      });
    }

    // Generate unique booking number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `BK-${dateStr}-${randomSuffix}`;

    // Estimated base calculation (Super Admin will verify & approve final price)
    let estimatedPrice = 149.0; // Base package
    if (rooms) estimatedPrice += Number(rooms) * 35;
    if (bathrooms) estimatedPrice += Number(bathrooms) * 40;
    if (addons && Array.isArray(addons)) {
      estimatedPrice += addons.length * 45;
    }

    const newBooking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer?.id || null,
        customerName: name || 'Valued Customer',
        customerEmail: email,
        customerPhone: phone,
        serviceId: serviceId || null,
        serviceName: serviceName || 'Carpet & Pest Service',
        serviceAddress: `${serviceAddress}${suburb ? ', ' + suburb : ''}${postcode ? ' ' + postcode : ''}`,
        suburb: suburb || null,
        postcode: postcode || null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        timeSlot: timeSlot || 'Morning (8AM - 11AM)',
        squareFootage: squareFootage ? parseInt(squareFootage, 10) : null,
        rooms: rooms ? parseInt(rooms, 10) : null,
        bathrooms: bathrooms ? parseInt(bathrooms, 10) : null,
        addons: addons ? JSON.stringify(addons) : null,
        totalPrice: estimatedPrice,
        approvedPrice: null, // To be reviewed & approved by Super Admin
        depositRequired: 50.0, // Fixed 50 AUD deposit
        depositPaid: 0.0,
        balanceDue: estimatedPrice,
        quoteStatus: 'PENDING_APPROVAL',
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        notes: notes || null,
        reminderMobileOpt: reminderMobileOpt !== false,
        reminderEmailOpt: reminderEmailOpt !== false,
      },
    });

    // Notify Super Admin and Customer
    try {
      await notifyQuotationSubmitted(newBooking);
    } catch (notifErr) {
      console.warn('Notification non-fatal error:', notifErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Demand quotation submitted successfully! Super Admin will review and approve your quote.',
      data: newBooking,
    });
  } catch (error: any) {
    console.error('Error submitting quotation request:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit quotation' },
      { status: 500 }
    );
  }
}
