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

    const cleanEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
        customer: true,
        employee: true,
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials or account is suspended' },
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
    const roleSlug = user.role?.slug || 'customer';
    const roleName = user.role?.name || 'Customer';

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone || user.customer?.phone || user.employee?.phone || null,
      role: roleName,
      roleSlug: roleSlug,
      permissions,
      customerId: user.customer?.id || null,
      employeeId: user.employee?.id || null,
    });

    // Log login activity
    await logActivity({
      userId: user.id,
      userName: user.name,
      action: 'LOGIN',
      module: 'Auth',
      details: { email: user.email, role: roleName, roleSlug },
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
          phone: user.phone || user.customer?.phone || user.employee?.phone,
          role: roleName,
          roleSlug: roleSlug,
          avatar: user.avatar,
          permissions,
          customerId: user.customer?.id,
          employeeId: user.employee?.id,
        },
      },
    });

    // Set HTTP-only Cookie across auth tokens
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    };

    response.cookies.set('admin_token', token, cookieOptions);
    response.cookies.set('customer_token', token, cookieOptions);
    response.cookies.set('auth_token', token, cookieOptions);

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
