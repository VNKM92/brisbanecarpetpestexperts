import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceTag = searchParams.get('tag');

    const where: any = { isActive: true };
    if (serviceTag) {
      where.serviceTag = serviceTag;
    }

    const categories = await prisma.faqCategory.findMany({
      include: {
        faqs: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    const standaloneFaqs = await prisma.faq.findMany({
      where: { ...where, categoryId: null },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: {
        categories,
        standaloneFaqs,
      },
    });
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}
