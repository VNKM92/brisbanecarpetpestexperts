import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    const search = searchParams.get('search');

    if (slug) {
      const blog = await prisma.blog.findUnique({
        where: { slug },
        include: { category: true },
      });
      if (!blog || blog.status !== 'PUBLISHED') {
        return NextResponse.json(
          { success: false, message: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    }

    const where: any = { status: 'PUBLISHED' };
    if (category) {
      where.category = {
        name: { equals: category },
      };
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    });

    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        blogs,
        categories,
      },
    });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
