import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const [blogs, categories] = await Promise.all([
      prisma.blog.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return NextResponse.json({ success: true, data: { items: blogs, categories } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, slug, excerpt, content, featuredImg, author, readTime, categoryId, tags, metaTitle, metaDesc, status } = body;

    const formattedSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
      : title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const created = await prisma.blog.create({
      data: {
        title,
        slug: formattedSlug,
        excerpt,
        content,
        featuredImg,
        author: author || user.name,
        readTime: readTime ? parseInt(readTime) : 5,
        categoryId: categoryId || null,
        tags,
        metaTitle,
        metaDesc,
        status: status || 'PUBLISHED',
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'Blogs',
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
    const { id, readTime, ...data } = body;

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        ...data,
        ...(readTime !== undefined ? { readTime: parseInt(readTime) } : {}),
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Blogs',
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

    await prisma.blog.delete({ where: { id } });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'DELETE',
      module: 'Blogs',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Blog post deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
