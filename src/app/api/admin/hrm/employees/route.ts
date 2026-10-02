import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser, hashPassword } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const employees = await prisma.employee.findMany({
      include: {
        user: {
          select: {
            id: true,
            status: true,
            avatar: true,
          },
        },
        assignedBookings: {
          select: {
            id: true,
            bookingNumber: true,
            serviceName: true,
            status: true,
            scheduledDate: true,
          },
        },
        attendances: {
          take: 7,
          orderBy: { date: 'desc' },
        },
        jobReports: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: { photos: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: employees,
    });
  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch employees' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      password,
      designation,
      department,
      hourlyRate,
      skills,
      emergencyContact,
      licenseNumber,
      address,
    } = body;

    if (!name || !email || !phone || !designation) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone and designation are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check existing
    const existing = await prisma.employee.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An employee with this email already exists' },
        { status: 409 }
      );
    }

    // Role Staff
    let staffRole = await prisma.role.findUnique({ where: { slug: 'staff' } });
    if (!staffRole) {
      staffRole = await prisma.role.create({
        data: {
          name: 'Staff',
          slug: 'staff',
          description: 'Field technician / cleaning specialist',
          isSystem: true,
        },
      });
    }

    // Create User login account for the employee
    const passwordHash = await hashPassword(password || 'Staff@123456');
    const newUser = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: {
        name,
        phone,
        roleId: staffRole.id,
      },
      create: {
        name,
        email: cleanEmail,
        passwordHash,
        phone,
        roleId: staffRole.id,
        status: 'ACTIVE',
      },
    });

    // Generate Employee Code
    const count = await prisma.employee.count();
    const employeeCode = `EMP-${(count + 101).toString().padStart(3, '0')}`;

    const newEmployee = await prisma.employee.create({
      data: {
        employeeCode,
        userId: newUser.id,
        name,
        email: cleanEmail,
        phone,
        designation,
        department: department || 'Cleaning & Pest Control',
        hourlyRate: parseFloat(hourlyRate) || 35.0,
        skills: Array.isArray(skills) ? JSON.stringify(skills) : skills || '["Carpet Cleaning", "Pest Control"]',
        emergencyContact: emergencyContact || null,
        licenseNumber: licenseNumber || null,
        address: address || null,
        status: 'ACTIVE',
      },
    });

    await logActivity({
      userId: authUser.userId,
      userName: authUser.name,
      action: 'CREATE',
      module: 'HRM',
      details: { employeeCode, name, designation },
    });

    return NextResponse.json({
      success: true,
      message: `Employee ${name} (${employeeCode}) onboarded successfully!`,
      data: newEmployee,
    });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ success: false, message: 'Failed to create employee' }, { status: 500 });
  }
}
