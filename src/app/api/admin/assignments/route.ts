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
    const bookingId = searchParams.get('bookingId');
    const employeeId = searchParams.get('employeeId');

    const where: any = {};
    if (bookingId) where.bookingId = bookingId;
    if (employeeId) where.employeeId = employeeId;

    const crewMembers = await prisma.bookingCrewMember.findMany({
      where,
      include: {
        employee: true,
        booking: {
          include: {
            customer: true,
            jobReport: {
              include: { photos: true },
            },
          },
        },
      },
      orderBy: { assignedAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: crewMembers });
  } catch (error: any) {
    console.error('Error fetching crew assignments:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch assignments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      bookingId,
      crew, // Array of { employeeId, role, isLead, notes }
      primaryEmployeeId,
    } = body;

    if (!bookingId || !crew || !Array.isArray(crew)) {
      return NextResponse.json(
        { success: false, message: 'Booking ID and crew member array are required' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { customer: true },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    // Determine lead employee
    const leadMember = crew.find((c: any) => c.isLead) || crew[0];
    const mainLeadId = primaryEmployeeId || leadMember?.employeeId || null;

    // 1. Clear existing crew for this booking
    await prisma.bookingCrewMember.deleteMany({
      where: { bookingId },
    });

    // 2. Insert updated crew (supports 1 to 5+ technicians/cleaners)
    const createdCrew = [];
    for (const member of crew) {
      if (member.employeeId) {
        const record = await prisma.bookingCrewMember.create({
          data: {
            bookingId,
            employeeId: member.employeeId,
            role: member.role || 'Technician',
            isLead: Boolean(member.isLead || member.employeeId === mainLeadId),
            notes: member.notes || null,
          },
          include: {
            employee: true,
          },
        });
        createdCrew.push(record);

        // Send alert to assigned technician
        if (record.employee.userId) {
          await createDashboardNotification({
            userId: record.employee.userId,
            roleTarget: 'EMPLOYEE',
            title: `Assigned to Job #${booking.bookingNumber}`,
            message: `You have been assigned as ${record.role} for ${booking.serviceName} at ${booking.serviceAddress}`,
            type: 'INFO',
            link: '/employee',
          });
        }
      }
    }

    // 3. Update primary assigned technician on booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        assignedEmployeeId: mainLeadId,
      },
      include: {
        assignedEmployee: true,
        crew: {
          include: { employee: true },
        },
        customer: true,
      },
    });

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'UPDATE',
      module: 'TechnicianAssignment',
      details: {
        bookingNumber: booking.bookingNumber,
        crewSize: createdCrew.length,
        technicians: createdCrew.map((c) => `${c.employee.name} (${c.role})`).join(', '),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${createdCrew.length} technician(s) to booking #${booking.bookingNumber}`,
      data: updatedBooking,
    });
  } catch (error: any) {
    console.error('Error assigning crew:', error);
    return NextResponse.json({ success: false, message: error.message || 'Failed to assign crew' }, { status: 500 });
  }
}
