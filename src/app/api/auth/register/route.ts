import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { createDashboardNotification, sendEmailNotification } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, address, suburb, postcode, roleType } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Full name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists. Please log in.' },
        { status: 409 }
      );
    }

    // Role resolution (Default to Customer, or Employee if requested)
    const targetSlug = roleType === 'employee' ? 'staff' : 'customer';
    let role = await prisma.role.findUnique({
      where: { slug: targetSlug },
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: targetSlug === 'customer' ? 'Customer' : 'Staff',
          slug: targetSlug,
          description: targetSlug === 'customer' ? 'Registered customer' : 'Field technician / staff',
          isSystem: true,
        },
      });
    }

    const passwordHash = await hashPassword(password);

    // Create User record
    const newUser = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        phone: phone || null,
        roleId: role.id,
        status: 'ACTIVE',
      },
    });

    // If Customer role, create linked Customer record
    let customerRecord = null;
    if (targetSlug === 'customer') {
      customerRecord = await prisma.customer.upsert({
        where: { email: cleanEmail },
        update: {
          userId: newUser.id,
          name,
          phone: phone || null,
          address: address || null,
          suburb: suburb || null,
          postcode: postcode || null,
        },
        create: {
          userId: newUser.id,
          name,
          email: cleanEmail,
          phone: phone || null,
          address: address || null,
          suburb: suburb || null,
          postcode: postcode || null,
        },
      });
    } else if (targetSlug === 'staff') {
      // Create Employee Record
      const count = await prisma.employee.count();
      const code = `EMP-${(count + 101).toString().padStart(3, '0')}`;
      await prisma.employee.create({
        data: {
          employeeCode: code,
          userId: newUser.id,
          name,
          email: cleanEmail,
          phone: phone || '0400000000',
          designation: 'Cleaning & Pest Field Specialist',
          department: 'Cleaning & Pest Control',
          address: address ? `${address}, ${suburb || ''} ${postcode || ''}` : null,
        },
      });
    }

    // Sign Token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      role: role.name,
      roleSlug: role.slug,
      permissions: [],
      customerId: customerRecord?.id || null,
    });

    // Welcome Notification
    await createDashboardNotification({
      userId: newUser.id,
      roleTarget: targetSlug.toUpperCase(),
      title: 'Welcome to Brisbane Carpet & Pest Experts!',
      message: 'Your account is ready. Request quotations, track confirmed bookings, and view live technician inspection photos.',
      type: 'INFO',
      link: '/dashboard',
    });

    // Send Welcome Email
    await sendEmailNotification({
      to: cleanEmail,
      subject: 'Welcome to Brisbane Carpet & Pest Experts!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1e3a8a;">Welcome, ${name}!</h2>
          <p>Thank you for creating an account with <strong>Brisbane Carpet & Pest Experts</strong>.</p>
          <p>You can now request tailored demand quotations, approve estimates, pay secure $50 AUD deposits, track your bookings, and view before/after technician photos directly from your dashboard.</p>
          <p style="margin-top: 25px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard" style="background:#2563eb; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">Go to My Dashboard</a></p>
        </div>
      `,
      recipientName: name,
    });

    await logActivity({
      userId: newUser.id,
      userName: newUser.name,
      action: 'CREATE',
      module: 'Auth',
      details: { email: cleanEmail, role: role.slug },
    });

    const response = NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: role.name,
          roleSlug: role.slug,
          customerId: customerRecord?.id,
        },
      },
    });

    // Set Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    };
    response.cookies.set('admin_token', token, cookieOptions);
    response.cookies.set('customer_token', token, cookieOptions);
    response.cookies.set('auth_token', token, cookieOptions);

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
