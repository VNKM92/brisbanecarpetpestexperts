import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    const where: any = { isActive: true };
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (featuredOnly) {
      where.isFeatured = true;
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { order: 'asc' },
    });

    const categories = await prisma.serviceCategory.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: {
        services,
        categories,
      },
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
