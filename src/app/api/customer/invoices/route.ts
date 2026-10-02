import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        OR: [
          { customerEmail: authUser.email },
          ...(authUser.customerId ? [{ customerId: authUser.customerId }] : []),
        ],
      },
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

    return NextResponse.json({
      success: true,
      data: invoices,
    });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch invoices' }, { status: 500 });
  }
}
