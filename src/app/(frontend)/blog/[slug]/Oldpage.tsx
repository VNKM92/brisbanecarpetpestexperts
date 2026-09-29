    // pages/blog/[slug].js
    import { useRouter } from 'next/router';

    const BlogPostPage = () => {
      const router = useRouter();
      const { slug } = router.query;

      // Fetch blog post data using the slug
      // ...

      return (
        <>
        <div>
          <h1>Blog Post: {slug}</h1>
          {/* Render your blog post content here */}
        </div>
            {/* <!-- MAIN WRAPPER --> */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">

                {/* <!-- GRID: CONTENT + SIDEBAR --> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* <!-- ======================
                        BLOG CONTENT SECTION
                    ======================= -->  */}
                    <div className="lg:col-span-2">

                        {/* <!-- Blog Paragraphs --> */}
                        <p className="text-sm leading-7 mb-6">
                            Capitalize on low hanging fruit to identify a ballpark value added activity to beta test...
                        </p>

                        {/* <!-- Quote Box --> */}
                        <div className="bg-gray-100 border-l-4 border-orange-500 p-6 my-8 shadow-sm">
                            <p className="font-semibold text-lg">
                                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                            </p>
                            <p className="mt-2 text-sm">
                                Dramatically maintain clicks-and-mortar solutions without functional solutions.
                            </p>
                        </div>

                        {/* <!-- More Text --> */}
                        <p className="text-sm leading-7 mb-6">
                            Completely synergize resource taxing relationships via premier niche markets...
                        </p>

                        {/* <!-- Tags and Share --> */}
                        <div className="flex flex-wrap items-center justify-between py-4 border-t border-b text-sm">
                            <div className="flex gap-2 text-gray-600">
                                <span>Cleaning</span>
                                <span>Services</span>
                                <span>Tips & Tricks</span>
                            </div>

                            <div className="flex gap-3 text-orange-500">
                                <i className="fa-solid fa-share"></i>
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-pinterest"></i>
                            </div>
                        </div>

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

                        {/* <!-- Leave a Reply --> */}
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

                    </div>

                    {/* <!-- ======================
                        SIDEBAR
                    ======================= -->  */}
                    <aside className="space-y-10">

                        {/* <!-- Recent Posts --> */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>

                            <div className="space-y-4">
                                {/* <!-- Post Item --> */}
                                <div className="flex gap-4">
                                    <img src="https://via.placeholder.com/80" className="w-20 h-20 rounded object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold">How to Clean All Types of...</p>
                                        <p className="text-xs text-gray-500">July 20, 2023</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <img src="https://via.placeholder.com/80" className="w-20 h-20 rounded object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold">How To Clean and...</p>
                                        <p className="text-xs text-gray-500">July 10, 2023</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <img src="https://via.placeholder.com/80" className="w-20 h-20 rounded object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold">Best Robot Vacuums...</p>
                                        <p className="text-xs text-gray-500">June 30, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Categories --> */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Categories</h3>

                            <ul className="space-y-2 text-sm">
                                <li>Business</li>
                                <li>Cleaning</li>
                                <li>DIY</li>
                                <li>Guides</li>
                                <li>Organising</li>
                                <li>Services</li>
                                <li>Tips & Tricks</li>
                            </ul>
                        </div>

                    </aside>

                </div>
            </div>
        </>
      );
    };

    export default BlogPostPage;