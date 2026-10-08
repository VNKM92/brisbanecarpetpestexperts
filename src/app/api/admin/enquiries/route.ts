import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const unreadOnly = searchParams.get('unread') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (unreadOnly) where.isRead = false;
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { service: { contains: search } },
        { enquiryNumber: { contains: search } },
      ];
    }

    const [total, items, unreadCount] = await Promise.all([
      prisma.enquiry.count({ where }),
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.enquiry.count({
        where: { isRead: false },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items,
        unreadCount,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, status, notes, isRead } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing enquiry ID' }, { status: 400 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (isRead !== undefined) {
      updateData.isRead = isRead;
    } else if (status && status !== 'NEW') {
      updateData.isRead = true;
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });

    // Also sync with Notification table if enquiry is marked as read
    if (updateData.isRead === true) {
      await prisma.notification.updateMany({
        where: {
          link: { contains: id },
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });
    }

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Enquiries',
      entityId: id,
      details: { status, notes, isRead: updateData.isRead },
    });

    const unreadCount = await prisma.enquiry.count({
      where: { isRead: false },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      unreadCount,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });

    await prisma.enquiry.delete({ where: { id } });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'DELETE',
      module: 'Enquiries',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
