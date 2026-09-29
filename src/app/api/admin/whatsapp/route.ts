import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const items = await prisma.whatsappLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { phone, message } = body;

    const created = await prisma.whatsappLog.create({
      data: {
        phone,
        message,
        direction: 'OUTBOUND',
        status: 'SENT',
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'WhatsApp',
      entityId: created.id,
      details: { phone, message: message.slice(0, 40) },
    });

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent and logged successfully',
      data: created,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
