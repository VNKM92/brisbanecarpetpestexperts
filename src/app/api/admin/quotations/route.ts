import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const quoteStatus = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (quoteStatus && quoteStatus !== 'ALL') {
      where.quoteStatus = quoteStatus;
    }
    if (search) {
      where.OR = [
        { bookingNumber: { contains: search } },
        { customerName: { contains: search } },
        { customerEmail: { contains: search } },
        { serviceName: { contains: search } },
        { serviceAddress: { contains: search } },
      ];
    }

    const quotations = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        assignedEmployee: {
          select: {
            id: true,
            employeeCode: true,
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

    // Aggregates for Admin KPI header
    const totalPending = await prisma.booking.count({ where: { quoteStatus: 'PENDING_APPROVAL' } });
    const totalApproved = await prisma.booking.count({ where: { quoteStatus: 'APPROVED' } });
    const totalConfirmed = await prisma.booking.count({ where: { status: 'CONFIRMED' } });
    const totalDepositRevenue = await prisma.paymentTransaction.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        quotations,
        stats: {
          totalPending,
          totalApproved,
          totalConfirmed,
          totalRevenue: totalDepositRevenue._sum.amount || 0,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin quotations:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch quotations' }, { status: 500 });
  }
}
