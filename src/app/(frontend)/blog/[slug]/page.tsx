import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getAllBlogPosts,
  getBlogPostsByCategory,
  categories,
} from "../data";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const allPosts = getAllBlogPosts();

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different post)
  const relatedPosts = getBlogPostsByCategory(post.category[0])
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
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
          <div className="lg:col-span-2" data-aos="fade-right">

            
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
              {post.content.split("\n\n").map((paragraph, idx) => {
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
                        <li
                          key={i}
                          className="text-gray-700 leading-relaxed"
                        >
                          {item.replace("-", "").trim()}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p
                      key={idx}
                      className="text-gray-700 leading-relaxed mb-4"
                    >
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
              {/* comment data start */}
                {/* <!-- Comments Heading --> */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
                3 thoughts on “How to Clean All Types of Cutting Boards”
            </h2>

            {/* <!-- COMMENT CARD --> */}
                <div className="space-y-10">

                    {/* <!-- Comment 1 --> */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-semibold">Geovani Considine</p>
                            <p className="text-xs text-gray-500">January 25, 2018 at 9:35 am</p>
                            <p className="text-sm mt-2">
                                Doloribus veniam qui quisquam. Voluptatem porro in magni.
                            </p>
                            <button className="text-orange-600 text-sm mt-2">Reply</button>
                        </div>
                    </div>

                    {/* <!-- Comment 2 --> */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-semibold">Ms. Rita Thompson</p>
                            <p className="text-xs text-gray-500">January 25, 2018 at 9:35 am</p>
                            <p className="text-sm mt-2">
                                Quaerat et deserunt tempore laboriosam...
                            </p>
                            <button className="text-orange-600 text-sm mt-2">Reply</button>
                        </div>
                    </div>

                    {/* <!-- Comment 3 --> */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <p className="font-semibold">Grant Hagenes</p>
                            <p className="text-xs text-gray-500">January 25, 2018 at 9:35 am</p>
                            <p className="text-sm mt-2">
                                In aliquam rerum sunt eligendi...
                            </p>
                            <button className="text-orange-600 text-sm mt-2">Reply</button>
                        </div>
                    </div>

                </div>
              {/* comment data end */}
              {/* work on form and data */}
                <h3 className="text-xl font-bold mt-12 mb-4">Leave a Reply</h3>

                    <form className="space-y-4">
                        <div>
                            <label className="text-sm">Comment *</label>
                            <textarea className="w-full border rounded-md p-3 h-32"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Name *</label>
                                <input type="text" className="w-full border rounded-md p-3" />
                            </div>
                            <div>
                                <label className="text-sm">Email *</label>
                                <input type="email" className="w-full border rounded-md p-3" />
                            </div>
                        </div>

                        <button className="bg-orange-600 text-white px-6 py-2 rounded-md">
                            Post Comment
                        </button>
                    </form>
              {/* end */}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t">
                <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="w-full h-40 relative rounded-lg overflow-hidden mb-4">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {relatedPost.date}
                      </p>
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-500 transition line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* END LEFT COLUMN */}

          {/* RIGHT SIDEBAR */}
          <div className="space-y-10" data-aos="fade-left">
            {/* Recent Posts */}
            <div>
              <h2 className="font-bold text-lg mb-4">Recent Posts</h2>

              <div className="space-y-4">
                {allPosts.slice(0, 5).map((p) => (
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

            {/* Categories */}
            <div>
              <h2 className="font-bold text-lg mb-4">Categories</h2>
              <ul className="space-y-2 text-gray-600 text-sm">
                {categories.map((cat) => {
                  const count = getAllBlogPosts().filter((p) =>
                    p.category.includes(cat)
                  ).length;
                  return count > 0 ? (
                    <li key={cat}>
                      <Link
                        href={`/blog?category=${cat}`}
                        className="hover:text-orange-500 transition"
                      >
                        {cat} ({count})
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
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
