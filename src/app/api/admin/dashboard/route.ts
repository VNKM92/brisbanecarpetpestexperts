import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const [
      enquiriesCount,
      newEnquiriesCount,
      bookingsCount,
      confirmedBookingsCount,
      ordersCount,
      totalRevenueResult,
      customersCount,
      servicesCount,
      blogsCount,
      recentEnquiries,
      recentBookings,
      recentLogs,
    ] = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: { in: ['CONFIRMED', 'IN_PROGRESS', 'COMPLETED'] } } }),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'PAID' },
      }),
      prisma.customer.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.blog.count({ where: { status: 'PUBLISHED' } }),
      prisma.enquiry.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalRevenue = totalRevenueResult._sum.totalAmount || 0;

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          enquiriesCount,
          newEnquiriesCount,
          bookingsCount,
          confirmedBookingsCount,
          ordersCount,
          totalRevenue,
          customersCount,
          servicesCount,
          blogsCount,
        },
        recentEnquiries,
        recentBookings,
        recentLogs,
      },
    });
  } catch (error: any) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
