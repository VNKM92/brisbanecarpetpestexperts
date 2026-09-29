import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getBlogPostBySlug, getAllBlogPosts } from "../data";
import BlogCommentForm from "../components/BlogCommentForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let blog = null;
  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch (e) {}

  const post = blog || getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Blog Article Not Found | Brisbane Carpet & Pest Experts" };
  }

  const title = (post as any).metaTitle || post.title;
  const description = (post as any).metaDesc || post.excerpt || "";
  const image = (post as any).featuredImg || (post as any).image || "/images/og-image.jpg";

  return {
    title: `${title} | Brisbane Carpet & Pest Experts`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let dbBlog = null;
  let allBlogs: any[] = [];
  try {
    dbBlog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true },
    });
    allBlogs = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    });
  } catch (e) {}

  const fallbackPost = getBlogPostBySlug(slug);

  if (!dbBlog && !fallbackPost) {
    notFound();
  }

  const post = dbBlog
    ? {
        id: dbBlog.id,
        slug: dbBlog.slug,
        title: dbBlog.title,
        excerpt: dbBlog.excerpt,
        content: dbBlog.content,
        author: dbBlog.author,
        category: dbBlog.category ? [dbBlog.category.name] : ["Cleaning"],
        date: new Date(dbBlog.publishedAt || dbBlog.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        image: dbBlog.featuredImg || "/assets/blog/pages/carpet-and-pest-cleaning.jpg",
        readTime: dbBlog.readTime || 5,
      }
    : fallbackPost!;

  const sidePosts = allBlogs.length > 0
    ? allBlogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        date: new Date(b.publishedAt || b.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        image: b.featuredImg || "/assets/blog/pages/carpet-and-pest-cleaning.jpg",
      }))
    : getAllBlogPosts().slice(0, 5);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Brisbane Carpet & Pest Experts",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
      },
    },
    "datePublished": post.date,
  };

  return (
    <>
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center bg-no-repeat">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-900/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="flex gap-2 mb-3 justify-center flex-wrap">
            {post.category.map((cat) => (
              <span
                key={cat}
                className="bg-orange-500/90 text-white text-xs px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-2">
            {/* Article Metadata */}
            <div className="flex flex-wrap items-center text-gray-600 text-sm gap-6 pb-6 border-b">
              <span>📅 {post.date}</span>
              <span>⏱️ {post.readTime} min read</span>
              <span className="text-orange-500 font-semibold">
                By {post.author}
              </span>
            </div>

            {/* Article Body */}
            <div className="mt-8 prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph: string, idx: number) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                    >
                      {paragraph.replace("##", "").trim()}
                    </h2>
                  );
                }
                if (paragraph.startsWith("###")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-semibold text-gray-800 mt-6 mb-3"
                    >
                      {paragraph.replace("###", "").trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith("-")) {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                      {paragraph.split("\n").map((item, i) => (
                        <li key={i} className="text-gray-700 leading-relaxed">
                          {item.replace("-", "").trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Share Icons */}
            <div className="mt-12 flex items-center gap-4 text-gray-600 pt-6 border-t">
              <span className="font-semibold">Share this post:</span>
              <button className="p-2 hover:text-orange-500 hover:bg-orange-50 rounded-full transition">
                🔗
              </button>
              <button className="p-2 hover:text-orange-500 hover:bg-orange-50 rounded-full transition">
                👍
              </button>
              <button className="p-2 hover:text-orange-500 hover:bg-orange-50 rounded-full transition">
                🐦
              </button>
              <button className="p-2 hover:text-orange-500 hover:bg-orange-50 rounded-full transition">
                📧
              </button>
            </div>

            {/* Leave a Reply */}
            <BlogCommentForm articleTitle={post.title} />
          </div>
          {/* END LEFT COLUMN */}

          {/* RIGHT SIDEBAR */}
          <div className="space-y-10">
            {/* Recent Posts */}
            <div>
              <h2 className="font-bold text-lg mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {sidePosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">{p.date}</p>
                      <p className="group-hover:text-orange-500 font-medium text-sm leading-snug line-clamp-2 transition">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-4 border-t">
              <Link
                href="/blog"
                className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 transition"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
          {/* END SIDEBAR */}
        </div>
      </div>
    </>
  );
}
