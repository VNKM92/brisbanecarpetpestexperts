import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { notifyQuotationApproved } from '@/lib/notifications';
import { logActivity } from '@/lib/activity-logger';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        customer: true,
        assignedEmployee: true,
        jobReport: {
          include: {
            photos: true,
            employee: true,
          },
        },
        invoices: {
          include: {
            items: true,
          },
        },
        payments: true,
        reminderLogs: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: 'Quotation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    console.error('Error fetching quotation details:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const {
      action, // "APPROVE", "REJECT", "ASSIGN_EMPLOYEE", "UPDATE_DETAILS"
      approvedPrice,
      depositRequired,
      rejectionReason,
      assignedEmployeeId,
      scheduledDate,
      timeSlot,
      adminNotes,
      status,
    } = body;

    const currentBooking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!currentBooking) {
      return NextResponse.json({ success: false, message: 'Quotation not found' }, { status: 404 });
    }

    const updateData: any = {};

    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (scheduledDate) updateData.scheduledDate = new Date(scheduledDate);
    if (timeSlot) updateData.timeSlot = timeSlot;
    if (assignedEmployeeId !== undefined) updateData.assignedEmployeeId = assignedEmployeeId || null;
    if (status) updateData.status = status;

    if (action === 'APPROVE') {
      const finalPrice = approvedPrice ? parseFloat(approvedPrice) : currentBooking.totalPrice;
      const depositAmt = depositRequired ? parseFloat(depositRequired) : 50.0;

      updateData.quoteStatus = 'APPROVED';
      updateData.approvedPrice = finalPrice;
      updateData.depositRequired = depositAmt;
      updateData.balanceDue = finalPrice - (currentBooking.depositPaid || 0);

      const updated = await prisma.booking.update({
        where: { id },
        data: updateData,
        include: { customer: true, assignedEmployee: true },
      });

      // Send Instant Approval Notification (Email, SMS, Dashboard)
      try {
        await notifyQuotationApproved(updated);
      } catch (notifErr) {
        console.warn('Quotation approval notification error:', notifErr);
      }

      await logActivity({
        userId: authUser.userId,
        userName: authUser.name,
        action: 'APPROVAL',
        module: 'Quotations',
        details: {
          bookingNumber: currentBooking.bookingNumber,
          approvedPrice: finalPrice,
          depositRequired: depositAmt,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Quotation approved! Total: $${finalPrice} AUD, Deposit required: $${depositAmt} AUD. Customer has been notified.`,
        data: updated,
      });
    }

    if (action === 'REJECT') {
      updateData.quoteStatus = 'REJECTED';
      updateData.status = 'CANCELLED';
      updateData.rejectionReason = rejectionReason || 'Requirements outside our current service scope.';

      const updated = await prisma.booking.update({
        where: { id },
        data: updateData,
      });

      await logActivity({
        userId: authUser.userId,
        userName: authUser.name,
        action: 'STATUS_CHANGE',
        module: 'Quotations',
        details: {
          bookingNumber: currentBooking.bookingNumber,
          status: 'REJECTED',
          reason: rejectionReason,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Quotation marked as rejected.',
        data: updated,
      });
    }

    // Generic update
    const updated = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: { customer: true, assignedEmployee: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Quotation updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating quotation:', error);
    return NextResponse.json({ success: false, message: 'Failed to update quotation' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Only Super Admin can delete records' }, { status: 403 });
    }

    const { id } = await context.params;

    await prisma.booking.delete({
      where: { id },
    });

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'DELETE',
      module: 'Quotations',
      details: { bookingId: id },
    });

    return NextResponse.json({
      success: true,
      message: 'Quotation / Booking deleted successfully by Super Admin',
    });
  } catch (error: any) {
    console.error('Error deleting quotation:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete record' }, { status: 500 });
  }
}
