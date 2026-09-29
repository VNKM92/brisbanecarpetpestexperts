import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { DEFAULT_HOMEPAGE_SECTIONS } from '@/lib/homepage-defaults';

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'homepage_sections' },
    });

    const homePage = await prisma.page.findUnique({
      where: { slug: 'home' },
    });

    let sections = DEFAULT_HOMEPAGE_SECTIONS;
    if (setting && setting.value) {
      try {
        const parsed = JSON.parse(setting.value);
        sections = { ...DEFAULT_HOMEPAGE_SECTIONS, ...parsed };
      } catch (e) {}
    }

    if (homePage) {
      sections.seo = {
        metaTitle: homePage.metaTitle || sections.seo.metaTitle,
        metaDesc: homePage.metaDesc || sections.seo.metaDesc,
        metaKeywords: homePage.metaKeywords || sections.seo.metaKeywords,
        canonicalUrl: homePage.canonicalUrl || sections.seo.canonicalUrl,
        ogImage: homePage.ogImage || sections.seo.ogImage,
        robots: homePage.robots || sections.seo.robots,
      };
    }

    return NextResponse.json({ success: true, data: sections });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sections } = body;

    if (!sections) {
      return NextResponse.json({ success: false, message: 'Missing sections payload' }, { status: 400 });
    }

    // Save in SiteSetting
    await prisma.siteSetting.upsert({
      where: { key: 'homepage_sections' },
      update: {
        value: JSON.stringify(sections),
        group: 'homepage',
        label: 'Homepage Dynamic Sections CMS',
      },
      create: {
        key: 'homepage_sections',
        value: JSON.stringify(sections),
        group: 'homepage',
        label: 'Homepage Dynamic Sections CMS',
      },
    });

    // Also sync with Page 'home' for SEO
    if (sections.seo) {
      await prisma.page.upsert({
        where: { slug: 'home' },
        update: {
          title: 'Home Page',
          metaTitle: sections.seo.metaTitle,
          metaDesc: sections.seo.metaDesc,
          metaKeywords: sections.seo.metaKeywords,
          canonicalUrl: sections.seo.canonicalUrl,
          ogImage: sections.seo.ogImage,
          robots: sections.seo.robots,
          isPublished: true,
        },
        create: {
          title: 'Home Page',
          slug: 'home',
          metaTitle: sections.seo.metaTitle,
          metaDesc: sections.seo.metaDesc,
          metaKeywords: sections.seo.metaKeywords,
          canonicalUrl: sections.seo.canonicalUrl,
          ogImage: sections.seo.ogImage,
          robots: sections.seo.robots,
          isPublished: true,
        },
      });
    }

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'UPDATE',
      module: 'Homepage CMS',
      entityId: 'homepage_sections',
      details: 'Updated Homepage Sections and SEO configurations',
    });

    return NextResponse.json({
      success: true,
      message: 'Homepage content and SEO updated successfully!',
    });
  } catch (error: any) {
    console.error('Homepage settings save error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
