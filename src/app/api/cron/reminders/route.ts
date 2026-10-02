import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { send2DayPreBookingReminder } from '@/lib/notifications';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    // Window: from 24 hours to 72 hours ahead (centered on 48h / 2 days)
    const startWindow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const endWindow = new Date(now.getTime() + 72 * 60 * 60 * 1000);

    const eligibleBookings = await prisma.booking.findMany({
      where: {
        scheduledDate: {
          gte: startWindow,
          lte: endWindow,
        },
        reminderSent2Days: false,
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
      include: {
        customer: true,
        assignedEmployee: true,
      },
    });

    const results = [];

    for (const booking of eligibleBookings) {
      try {
        await send2DayPreBookingReminder(booking);
        results.push({
          bookingNumber: booking.bookingNumber,
          customer: booking.customerName,
          email: booking.customerEmail,
          phone: booking.customerPhone,
          scheduledDate: booking.scheduledDate,
          status: 'SUCCESS',
        });
      } catch (err: any) {
        console.error(`Failed reminder for ${booking.bookingNumber}:`, err);
        results.push({
          bookingNumber: booking.bookingNumber,
          customer: booking.customerName,
          status: 'ERROR',
          error: err.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      processedCount: results.length,
      data: results,
    });
  } catch (error: any) {
    console.error('Error in reminder cron:', error);
    return NextResponse.json({ success: false, message: 'Cron job execution error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
