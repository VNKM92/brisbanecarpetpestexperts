import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const pages = await prisma.page.findMany({
      orderBy: { title: 'asc' },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, slug, heading, subheading, content, bannerImage, metaTitle, metaDesc, metaKeywords, canonicalUrl, ogImage, robots, customSchema, isPublished } = body;

    const formattedSlug = slug
      ? slug.toLowerCase().replace(/^\//, '').replace(/[^a-z0-9-/]/g, '-')
      : title.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const created = await prisma.page.create({
      data: {
        title,
        slug: formattedSlug,
        heading,
        subheading,
        content,
        bannerImage,
        metaTitle,
        metaDesc,
        metaKeywords,
        canonicalUrl,
        ogImage,
        robots: robots || 'index, follow',
        customSchema,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'Pages',
      entityId: created.id,
      details: { title, slug: formattedSlug },
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

    const updated = await prisma.page.update({
      where: { id },
      data,
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Pages',
      entityId: id,
      details: { title: updated.title },
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

    await prisma.page.delete({ where: { id } });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'DELETE',
      module: 'Pages',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Page deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
