import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { notifyDepositPaid } from '@/lib/notifications';
import { logActivity } from '@/lib/activity-logger';

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    const body = await request.json();

    const {
      bookingId,
      invoiceId,
      amount,
      paymentGateway, // STRIPE, PAYPAL, POLI, PAYID, AFTERPAY, BANK_TRANSFER
      paymentType = 'DEPOSIT', // DEPOSIT or FULL_PAYMENT
      gatewayRef,
      payerEmail,
      cardLast4,
      notes,
    } = body;

    if (!bookingId && !invoiceId) {
      return NextResponse.json(
        { success: false, message: 'Booking ID or Invoice ID is required' },
        { status: 400 }
      );
    }

    const payAmount = Number(amount || 50.0);

    // Fetch booking
    let booking = null;
    if (bookingId) {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { customer: true },
      });
    }

    if (!booking && invoiceId) {
      const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { booking: { include: { customer: true } } },
      });
      booking = invoice?.booking || null;
    }

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Generate Transaction Number
    const txnNum = `TXN-AU-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    // Create Payment Transaction Record
    const payment = await prisma.paymentTransaction.create({
      data: {
        transactionNumber: txnNum,
        bookingId: booking.id,
        invoiceId: invoiceId || null,
        customerId: booking.customerId || authUser?.customerId || null,
        amount: payAmount,
        currency: 'AUD',
        paymentGateway: paymentGateway || 'STRIPE',
        paymentType,
        status: 'SUCCESS',
        gatewayRef: gatewayRef || `REF-${paymentGateway || 'AU'}-${Math.floor(100000 + Math.random() * 900000)}`,
        payerEmail: payerEmail || authUser?.email || booking.customerEmail,
        notes: notes || `Payment for booking ${booking.bookingNumber} (${paymentType})`,
        metadata: JSON.stringify({
          cardLast4: cardLast4 || '4242',
          ipCountry: 'AU',
          processedAt: new Date().toISOString(),
        }),
      },
    });

    // Update Booking Status
    const totalApproved = booking.approvedPrice || booking.totalPrice || payAmount;
    const newDepositPaid = (booking.depositPaid || 0) + payAmount;
    const newBalanceDue = Math.max(0, totalApproved - newDepositPaid);
    const paymentStatus = newBalanceDue === 0 ? 'FULLY_PAID' : 'DEPOSIT_PAID';

    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        depositPaid: newDepositPaid,
        balanceDue: newBalanceDue,
        paymentStatus,
        status: 'CONFIRMED', // Once deposit is paid, booking is confirmed!
        paymentGateway: paymentGateway || 'STRIPE',
      },
      include: {
        customer: true,
        assignedEmployee: true,
      },
    });

    // Auto Create or Update Invoice
    const existingInvoice = await prisma.invoice.findFirst({
      where: { bookingId: booking.id },
    });

    const subtotal = totalApproved / 1.1; // Australian GST breakdown
    const gstAmount = totalApproved - subtotal;

    if (!existingInvoice) {
      const invNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      await prisma.invoice.create({
        data: {
          invoiceNumber: invNumber,
          bookingId: booking.id,
          customerId: booking.customerId,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          customerPhone: booking.customerPhone,
          customerAddress: booking.serviceAddress,
          subtotal: Number(subtotal.toFixed(2)),
          gstRate: 10.0,
          gstAmount: Number(gstAmount.toFixed(2)),
          totalAmount: totalApproved,
          depositPaid: newDepositPaid,
          balanceDue: newBalanceDue,
          status: newBalanceDue === 0 ? 'PAID' : 'PARTIAL',
          paymentMethod: paymentGateway || 'STRIPE',
          items: {
            create: [
              {
                description: `${booking.serviceName} - Professional Service (Booking #${booking.bookingNumber})`,
                quantity: 1,
                unitPrice: totalApproved,
                totalPrice: totalApproved,
              },
            ],
          },
        },
      });
    } else {
      await prisma.invoice.update({
        where: { id: existingInvoice.id },
        data: {
          depositPaid: newDepositPaid,
          balanceDue: newBalanceDue,
          status: newBalanceDue === 0 ? 'PAID' : 'PARTIAL',
          paymentMethod: paymentGateway || existingInvoice.paymentMethod,
        },
      });
    }

    // Send confirmation notifications
    try {
      await notifyDepositPaid(updatedBooking, payment);
    } catch (err) {
      console.warn('Notification non-fatal error:', err);
    }

    // Log Activity
    await logActivity({
      userId: authUser?.userId || null,
      userName: authUser?.name || booking.customerName,
      action: 'PAYMENT',
      module: 'Payments',
      details: {
        bookingNumber: booking.bookingNumber,
        amount: payAmount,
        currency: 'AUD',
        gateway: paymentGateway,
        txn: txnNum,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Deposit of $${payAmount} AUD received successfully! Your booking is now CONFIRMED.`,
      data: {
        booking: updatedBooking,
        payment,
      },
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
