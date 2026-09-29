import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const [roles, permissions] = await Promise.all([
      prisma.role.findMany({
        include: {
          permissions: {
            include: { permission: true },
          },
          _count: { select: { users: true } },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.permission.findMany({ orderBy: { category: 'asc' } }),
    ]);

    return NextResponse.json({ success: true, data: { roles, permissions } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, slug, description, permissionIds } = body;

    const formattedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
      : name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const created = await prisma.role.create({
      data: {
        name,
        slug: formattedSlug,
        description,
      },
    });

    if (Array.isArray(permissionIds) && permissionIds.length > 0) {
      await prisma.rolePermission.createMany({
        data: permissionIds.map((pId: string) => ({
          roleId: created.id,
          permissionId: pId,
        })),
      });
    }

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'Roles',
      entityId: created.id,
      details: { name, slug: formattedSlug },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, name, description, permissionIds } = body;

    const updated = await prisma.role.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
      },
    });

    if (Array.isArray(permissionIds)) {
      await prisma.rolePermission.deleteMany({ where: { roleId: id } });
      await prisma.rolePermission.createMany({
        data: permissionIds.map((pId: string) => ({
          roleId: id,
          permissionId: pId,
        })),
      });
    }

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Roles',
      entityId: id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
