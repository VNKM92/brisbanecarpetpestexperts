import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { getClientInfo } from '@/lib/security';

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  const { ipAddress, userAgent } = getClientInfo(request);

  if (user) {
    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'LOGOUT',
      module: 'Auth',
      details: { email: user.email },
      ipAddress,
      userAgent,
    });
  }

  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
