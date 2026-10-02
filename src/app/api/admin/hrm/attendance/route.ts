import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const attendances = await prisma.attendance.findMany({
      include: {
        employee: {
          select: {
            id: true,
            employeeCode: true,
            name: true,
            designation: true,
          },
        },
      },
      orderBy: { date: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: attendances });
  } catch (error: any) {
    console.error('Error fetching attendance records:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { employeeId, status = 'PRESENT', workNotes, checkIn, checkOut, date } = body;

    const targetEmployeeId = employeeId || authUser.employeeId;

    if (!targetEmployeeId) {
      return NextResponse.json({ success: false, message: 'Employee ID is required' }, { status: 400 });
    }

    const todayDate = date ? new Date(date) : new Date();
    // Normalize to start of day for unique constraint
    const normalizedDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

    const attendance = await prisma.attendance.upsert({
      where: {
        employeeId_date: {
          employeeId: targetEmployeeId,
          date: normalizedDate,
        },
      },
      update: {
        status,
        checkIn: checkIn ? new Date(checkIn) : new Date(),
        checkOut: checkOut ? new Date(checkOut) : undefined,
        workNotes: workNotes || undefined,
      },
      create: {
        employeeId: targetEmployeeId,
        date: normalizedDate,
        status,
        checkIn: checkIn ? new Date(checkIn) : new Date(),
        checkOut: checkOut ? new Date(checkOut) : null,
        workNotes: workNotes || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Daily attendance recorded successfully',
      data: attendance,
    });
  } catch (error: any) {
    console.error('Error recording attendance:', error);
    return NextResponse.json({ success: false, message: 'Failed to record attendance' }, { status: 500 });
  }
}
