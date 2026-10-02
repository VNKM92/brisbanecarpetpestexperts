import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const where: any = {};
    if (authUser.roleSlug === 'staff' && authUser.employeeId) {
      where.assignedEmployeeId = authUser.employeeId;
    }

    const jobs = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        assignedEmployee: true,
        jobReport: {
          include: {
            photos: true,
          },
        },
      },
      orderBy: { scheduledDate: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: jobs,
    });
  } catch (error: any) {
    console.error('Error fetching employee jobs:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch jobs' }, { status: 500 });
  }
}
