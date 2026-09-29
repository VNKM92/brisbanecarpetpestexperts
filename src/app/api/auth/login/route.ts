import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials or inactive account' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const permissions = user.role?.permissions.map((rp) => rp.permission.slug) || [];
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role?.name || 'Staff',
      roleSlug: user.role?.slug || 'staff',
      permissions,
    });

    // Log login activity
    await logActivity({
      userId: user.id,
      userName: user.name,
      action: 'LOGIN',
      module: 'Auth',
      details: { email: user.email, role: user.role?.name },
    });

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role?.name,
          roleSlug: user.role?.slug,
          avatar: user.avatar,
          permissions,
        },
      },
    });

    // Set HTTP-only Cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
