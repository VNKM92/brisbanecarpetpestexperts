import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { createDashboardNotification, sendEmailNotification } from '@/lib/notifications';
import { logActivity } from '@/lib/activity-logger';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id: bookingId } = await context.params;
    const body = await request.json();

    const {
      photoUrl, // Single or array of photo URLs
      photos, // Array of { photoUrl, type, caption }
      type = 'BEFORE', // 'BEFORE', 'DURING', 'AFTER', 'FAULT_EVIDENCE'
      caption,
      faultNotes,
      workDescription,
      treatmentApplied,
      status = 'IN_PROGRESS', // 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'ISSUE_REPORTED'
      checklist,
    } = body;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { customer: true, assignedEmployee: true },
    });

    if (!booking) {
      return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
    }

    // Get or Create Job Report
    let jobReport = await prisma.jobReport.findUnique({
      where: { bookingId },
    });

    if (!jobReport) {
      jobReport = await prisma.jobReport.create({
        data: {
          bookingId,
          employeeId: authUser.employeeId || booking.assignedEmployeeId || null,
          visitTime: new Date(),
          status,
          faultNotes: faultNotes || null,
          workDescription: workDescription || null,
          treatmentApplied: treatmentApplied || null,
          checklist: checklist ? JSON.stringify(checklist) : null,
        },
      });
    } else {
      jobReport = await prisma.jobReport.update({
        where: { id: jobReport.id },
        data: {
          status,
          faultNotes: faultNotes !== undefined ? faultNotes : jobReport.faultNotes,
          workDescription: workDescription !== undefined ? workDescription : jobReport.workDescription,
          treatmentApplied: treatmentApplied !== undefined ? treatmentApplied : jobReport.treatmentApplied,
          checklist: checklist ? JSON.stringify(checklist) : jobReport.checklist,
          completionTime: status === 'COMPLETED' ? new Date() : jobReport.completionTime,
        },
      });
    }

    // Insert Photos
    const uploadedPhotosList: any[] = [];

    if (photos && Array.isArray(photos)) {
      for (const p of photos) {
        if (p.photoUrl) {
          const createdPhoto = await prisma.jobPhoto.create({
            data: {
              jobReportId: jobReport.id,
              photoUrl: p.photoUrl,
              type: p.type || type,
              caption: p.caption || caption || null,
              uploadedBy: authUser.name,
            },
          });
          uploadedPhotosList.push(createdPhoto);
        }
      }
    } else if (photoUrl) {
      const createdPhoto = await prisma.jobPhoto.create({
        data: {
          jobReportId: jobReport.id,
          photoUrl,
          type,
          caption: caption || null,
          uploadedBy: authUser.name,
        },
      });
      uploadedPhotosList.push(createdPhoto);
    }

    // Update main booking status if job completed or in progress
    if (status === 'COMPLETED') {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'COMPLETED' },
      });
    } else if (status === 'IN_PROGRESS' && booking.status !== 'COMPLETED') {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'IN_PROGRESS' },
      });
    }

    // Notify Customer about Inspection / Photo updates
    if (type === 'FAULT_EVIDENCE' || faultNotes) {
      await createDashboardNotification({
        userId: booking.customer?.userId || null,
        roleTarget: 'CUSTOMER',
        title: '⚠️ Pre-Existing Condition / Inspection Note Logged',
        message: `Our technician noted a pre-existing condition on your property for Booking #${booking.bookingNumber}. You can view the report and photos in your dashboard.`,
        type: 'WARNING',
        link: '/dashboard?tab=photos',
      });
    } else if (status === 'COMPLETED') {
      await createDashboardNotification({
        userId: booking.customer?.userId || null,
        roleTarget: 'CUSTOMER',
        title: '🎉 Service Completed Successfully!',
        message: `Your ${booking.serviceName} has been completed. Check out your technician's before & after photos and invoice in your dashboard.`,
        type: 'SUCCESS',
        link: '/dashboard?tab=photos',
      });
    }

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'UPDATE',
      module: 'FieldTechnician',
      details: {
        bookingNumber: booking.bookingNumber,
        status,
        photosCount: uploadedPhotosList.length,
        hasFaultNotes: !!faultNotes,
      },
    });

    const refreshedReport = await prisma.jobReport.findUnique({
      where: { id: jobReport.id },
      include: { photos: true, employee: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Inspection notes and photos uploaded successfully',
      data: refreshedReport,
    });
  } catch (error: any) {
    console.error('Error uploading job inspection data:', error);
    return NextResponse.json({ success: false, message: 'Failed to upload job data' }, { status: 500 });
  }
}
