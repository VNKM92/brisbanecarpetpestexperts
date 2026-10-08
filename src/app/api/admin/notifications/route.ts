import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all'; // all, unread, enquiries, bookings
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const whereNotification: any = {
      OR: [
        { roleTarget: 'ADMIN' },
        { roleTarget: 'ALL' },
        { userId: authUser.userId },
      ],
    };

    if (filter === 'unread') {
      whereNotification.isRead = false;
    } else if (filter === 'enquiries') {
      whereNotification.type = 'ENQUIRY';
    } else if (filter === 'bookings') {
      whereNotification.type = { in: ['QUOTE', 'PAYMENT', 'REMINDER'] };
    }

    // Parallel fetch counts & notification items
    const [notifications, unreadNotifCount, unreadEnquiriesCount, unreadQuotesCount, latestEnquiries] =
      await Promise.all([
        prisma.notification.findMany({
          where: whereNotification,
          orderBy: { createdAt: 'desc' },
          take: limit,
        }),
        prisma.notification.count({
          where: {
            OR: [
              { roleTarget: 'ADMIN' },
              { roleTarget: 'ALL' },
              { userId: authUser.userId },
            ],
            isRead: false,
          },
        }),
        prisma.enquiry.count({
          where: {
            isRead: false,
          },
        }),
        prisma.booking.count({
          where: {
            quoteStatus: 'PENDING_APPROVAL',
          },
        }),
        prisma.enquiry.findMany({
          orderBy: { createdAt: 'desc' },
          take: 6,
          select: {
            id: true,
            enquiryNumber: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            service: true,
            message: true,
            status: true,
            isRead: true,
            createdAt: true,
          },
        }),
      ]);

    // Calculate composite total unread count for the top bell badge
    // Unread enquiries + other unread notifications
    const totalUnread = Math.max(unreadNotifCount, unreadEnquiriesCount);

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadTotal: totalUnread,
        unreadNotifications: unreadNotifCount,
        unreadEnquiries: unreadEnquiriesCount,
        unreadQuotes: unreadQuotesCount,
        latestEnquiries,
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin notifications:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      notificationId,
      isRead = true,
      markAllRead,
      enquiryId,
      markAllEnquiriesRead,
    } = body;

    // 1. Mark single notification
    if (notificationId) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          isRead,
          readAt: isRead ? new Date() : null,
        },
      });
    }

    // 2. Mark specific enquiry as read
    if (enquiryId) {
      await prisma.enquiry.update({
        where: { id: enquiryId },
        data: { isRead: true },
      });

      // Also mark any notification linked to this enquiry as read
      await prisma.notification.updateMany({
        where: {
          link: { contains: enquiryId },
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
    }

    // 3. Mark all notifications as read
    if (markAllRead) {
      await prisma.notification.updateMany({
        where: {
          OR: [
            { roleTarget: 'ADMIN' },
            { roleTarget: 'ALL' },
            { userId: authUser.userId },
          ],
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
    }

    // 4. Mark all enquiries as read
    if (markAllEnquiriesRead) {
      await prisma.enquiry.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      });
    }

    // Recalculate and return fresh unread counts
    const [unreadNotifCount, unreadEnquiriesCount] = await Promise.all([
      prisma.notification.count({
        where: {
          OR: [
            { roleTarget: 'ADMIN' },
            { roleTarget: 'ALL' },
            { userId: authUser.userId },
          ],
          isRead: false,
        },
      }),
      prisma.enquiry.count({
        where: { isRead: false },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Updated successfully',
      data: {
        unreadTotal: Math.max(unreadNotifCount, unreadEnquiriesCount),
        unreadNotifications: unreadNotifCount,
        unreadEnquiries: unreadEnquiriesCount,
      },
    });
  } catch (error: any) {
    console.error('Error updating notification status:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update notification' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const clearRead = searchParams.get('clearRead');

    if (clearRead === 'true') {
      await prisma.notification.deleteMany({
        where: {
          OR: [
            { roleTarget: 'ADMIN' },
            { roleTarget: 'ALL' },
            { userId: authUser.userId },
          ],
          isRead: true,
        },
      });
      return NextResponse.json({ success: true, message: 'Read notifications cleared' });
    }

    if (id) {
      await prisma.notification.delete({ where: { id } });
      return NextResponse.json({ success: true, message: 'Notification deleted' });
    }

    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  } catch (error: any) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
