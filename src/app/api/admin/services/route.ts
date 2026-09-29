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

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { slug: { contains: search } },
        { shortDesc: { contains: search } },
      ];
    }

    const [items, categories] = await Promise.all([
      prisma.service.findMany({
        where,
        include: { category: true },
        orderBy: { order: 'asc' },
      }),
      prisma.serviceCategory.findMany({ orderBy: { order: 'asc' } }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, categories },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const {
      name,
      slug,
      categoryId,
      shortDesc,
      description,
      priceStarting,
      priceUnit,
      duration,
      icon,
      heroImage,
      features,
      tabData,
      metaTitle,
      metaDesc,
      isFeatured,
      isActive,
      order,
    } = body;

    const formattedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
      : name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const created = await prisma.service.create({
      data: {
        name,
        slug: formattedSlug,
        categoryId: categoryId || null,
        shortDesc,
        description,
        priceStarting: priceStarting ? parseFloat(priceStarting) : null,
        priceUnit: priceUnit || 'Fixed',
        duration,
        icon,
        heroImage,
        features: typeof features === 'object' ? JSON.stringify(features) : features,
        tabData: typeof tabData === 'object' ? JSON.stringify(tabData) : tabData,
        metaTitle,
        metaDesc,
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        order: order ? parseInt(order) : 0,
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'Services',
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
    const { id, ...data } = body;

    if (data.features && typeof data.features === 'object') {
      data.features = JSON.stringify(data.features);
    }
    if (data.tabData && typeof data.tabData === 'object') {
      data.tabData = JSON.stringify(data.tabData);
    }
    if (data.priceStarting !== undefined) {
      data.priceStarting = data.priceStarting ? parseFloat(data.priceStarting) : null;
    }
    if (data.order !== undefined) {
      data.order = parseInt(data.order);
    }

    const updated = await prisma.service.update({
      where: { id },
      data,
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Services',
      entityId: id,
      details: { name: updated.name },
    });

    return NextResponse.json({ success: true, data: updated });
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

    await prisma.service.delete({ where: { id } });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'DELETE',
      module: 'Services',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
