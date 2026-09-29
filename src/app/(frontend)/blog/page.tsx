"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getAllBlogPosts, getBlogPostsByCategory, categories } from "./data";

// Note: SEO metadata is managed in parent layout

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const allPosts = getAllBlogPosts();
  const displayedPosts = selectedCategory
    ? getBlogPostsByCategory(selectedCategory)
    : allPosts;

  return (
    <>
      {/* Banner Section */}
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                        bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/blog/home/brisbanecarpetpestexperts.jpg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Discover cleaning tips, pest control insights, and industry
              expertise from our expert team in Brisbane.
            </p>
          </div>
        </section>

        {/* Blog content */}
        <section>
          {/* Main Wrapper */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            {/* Layout: Left = content, Right = sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* LEFT COLUMN (Content) */}
              <div className="lg:col-span-2">
                {displayedPosts.length > 0 ? (
                  <div className="space-y-12">
                    {displayedPosts.map((post) => (
                      <article
                        key={post.id}
                        className="border-b pb-12 last:border-b-0"
                      >
                        {/* Hero Image */}
                        <div className="w-full rounded-lg overflow-hidden h-64 relative">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Article Metadata */}
                        <div className="mt-6 text-sm">
                          <span className="text-orange-500 font-semibold">
                            {post.author}
                          </span>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="mt-2 text-3xl lg:text-4xl font-bold hover:text-orange-500 transition cursor-pointer">
                            {post.title}
                          </h2>
                        </Link>

                        {/* Date + Category + Read Time */}
                        <div className="flex flex-wrap items-center text-gray-500 text-sm mt-3 gap-4">
                          <span>📅 {post.date}</span>
                          <span>🧰 {post.category.join(", ")}</span>
                          <span>⏱️ {post.readTime} min read</span>
                        </div>

                        {/* Excerpt */}
                        <p className="mt-4 text-gray-600 leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Share Icons */}
                        <div className="mt-6 flex items-center gap-3 text-gray-600">
                          <span className="font-semibold">Share:</span>
                          <button className="hover:text-orange-500 transition">
                            🔗
                          </button>
                          <button className="hover:text-orange-500 transition">
                            👍
                          </button>
                          <button className="hover:text-orange-500 transition">
                            🐦
                          </button>
                          <button className="hover:text-orange-500 transition">
                            📧
                          </button>
                        </div>

                        {/* Continue Reading */}
                        <div className="mt-6">
                          <Link href={`/blog/${post.slug}`}>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition">
                              Continue reading →
                            </button>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No posts found in this category.
                    </p>
                  </div>
                )}
              </div>
              {/* END LEFT COLUMN */}

              {/* RIGHT SIDEBAR */}
              <div className="space-y-10">
                {/* Search */}
                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>

                {/* Recent Posts */}
                <div>
                  <h2 className="font-bold text-lg mb-4">Recent Posts</h2>

                  <div className="space-y-4">
                    {allPosts.slice(0, 5).map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded flex-shrink-0 relative overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">{post.date}</p>
                          <p className="group-hover:text-orange-500 cursor-pointer font-medium text-sm leading-snug line-clamp-2 transition">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h2 className="font-bold text-lg mb-4">Categories</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li
                      onClick={() => setSelectedCategory(null)}
                      className={`hover:text-orange-500 cursor-pointer transition ${
                        selectedCategory === null ? "text-orange-500 font-semibold" : ""
                      }`}
                    >
                      All Posts ({allPosts.length})
                    </li>
                    {categories.map((cat) => {
                      const count = getBlogPostsByCategory(cat).length;
                      return count > 0 ? (
                        <li
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`hover:text-orange-500 cursor-pointer transition ${
                            selectedCategory === cat
                              ? "text-orange-500 font-semibold"
                              : ""
                          }`}
                        >
                          {cat} ({count})
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>
              {/* END SIDEBAR */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
