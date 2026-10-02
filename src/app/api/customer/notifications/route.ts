import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId: authUser.userId },
          { roleTarget: authUser.roleSlug.toUpperCase() },
          { roleTarget: 'ALL' },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    });
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      await prisma.notification.updateMany({
        where: {
          OR: [
            { userId: authUser.userId },
            { roleTarget: authUser.roleSlug.toUpperCase() },
          ],
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
    } else if (notificationId) {
      await prisma.notification.update({
        where: { id: notificationId },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Notification status updated',
    });
  } catch (error: any) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ success: false, message: 'Failed to update notification' }, { status: 500 });
  }
}
