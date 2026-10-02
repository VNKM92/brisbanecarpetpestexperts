import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { createDashboardNotification, sendEmailNotification } from '@/lib/notifications';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { invoiceNumber: { contains: search } },
        { customerName: { contains: search } },
        { customerEmail: { contains: search } },
      ];
    }

    const invoices = await prisma.invoice.findMany({
      where,
      include: {
        items: true,
        booking: {
          select: {
            id: true,
            bookingNumber: true,
            serviceName: true,
            scheduledDate: true,
            status: true,
          },
        },
        payments: true,
      },
      orderBy: { issuedDate: 'desc' },
    });

    const totalRevenue = invoices
      .filter((i) => i.status === 'PAID')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalPending = invoices
      .filter((i) => i.status !== 'PAID')
      .reduce((acc, curr) => acc + curr.balanceDue, 0);

    return NextResponse.json({
      success: true,
      data: {
        invoices,
        stats: {
          totalCount: invoices.length,
          totalRevenue,
          totalPending,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin invoices:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      bookingId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items, // array of { description, quantity, unitPrice }
      discount = 0,
      notes,
      dueDate,
      paymentMethod,
    } = body;

    if (!customerName || !customerEmail || !items || !items.length) {
      return NextResponse.json(
        { success: false, message: 'Customer name, email and at least 1 invoice item are required' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const calculatedSubtotal = items.reduce(
      (sum: number, item: any) => sum + Number(item.quantity || 1) * Number(item.unitPrice || 0),
      0
    );

    const discountAmount = Number(discount || 0);
    const taxableSubtotal = Math.max(0, calculatedSubtotal - discountAmount);
    const gstRate = 10.0; // 10% Australian GST
    const gstAmount = taxableSubtotal * 0.1;
    const totalAmount = taxableSubtotal + gstAmount;

    // Generate Invoice Number (e.g. INV-2026-1082)
    const year = new Date().getFullYear();
    const count = await prisma.invoice.count();
    const invoiceNumber = `INV-${year}-${(count + 1001).toString()}`;

    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        bookingId: bookingId || null,
        customerId: customerId || null,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        customerAddress: customerAddress || null,
        subtotal: calculatedSubtotal,
        gstRate,
        gstAmount,
        discount: discountAmount,
        totalAmount,
        depositPaid: 0,
        balanceDue: totalAmount,
        status: 'SENT',
        paymentMethod: paymentMethod || 'INVOICE',
        issuedDate: new Date(),
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: notes || 'Thank you for choosing Brisbane Carpet & Pest Experts!',
        items: {
          create: items.map((it: any) => ({
            description: it.description,
            quantity: parseInt(it.quantity, 10) || 1,
            unitPrice: parseFloat(it.unitPrice) || 0,
            totalPrice: (parseInt(it.quantity, 10) || 1) * (parseFloat(it.unitPrice) || 0),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Send Email with Invoice details to Customer
    await sendEmailNotification({
      to: customerEmail,
      subject: `📄 Tax Invoice ${invoiceNumber} from Brisbane Carpet & Pest Experts`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1e3a8a;">Tax Invoice ${invoiceNumber}</h2>
          <p>Hi ${customerName},</p>
          <p>Your official tax invoice for your cleaning / pest services is ready.</p>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:15px; border-radius:6px;">
            <p><strong>Total Amount (inc GST):</strong> $${totalAmount.toFixed(2)} AUD</p>
            <p><strong>GST (10%):</strong> $${gstAmount.toFixed(2)} AUD</p>
            <p><strong>Balance Due:</strong> $${totalAmount.toFixed(2)} AUD</p>
            <p><strong>Due Date:</strong> ${newInvoice.dueDate?.toLocaleDateString('en-AU')}</p>
          </div>
          <p style="margin-top:20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?tab=invoices" style="background:#2563eb; color:#fff; padding:10px 20px; border-radius:6px; text-decoration:none; font-weight:bold;">View Invoice in Dashboard</a></p>
        </div>
      `,
      recipientName: customerName,
    });

    await createDashboardNotification({
      roleTarget: 'CUSTOMER',
      title: `New Tax Invoice ${invoiceNumber}`,
      message: `A new tax invoice for $${totalAmount.toFixed(2)} AUD has been issued for your service.`,
      type: 'INFO',
      link: '/dashboard?tab=invoices',
    });

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'CREATE',
      module: 'Invoices',
      details: { invoiceNumber, totalAmount, customerEmail },
    });

    return NextResponse.json({
      success: true,
      message: `Invoice ${invoiceNumber} created and dispatched successfully.`,
      data: newInvoice,
    });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ success: false, message: 'Failed to create invoice' }, { status: 500 });
  }
}
