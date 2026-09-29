export default function BlogPage() {
    return (
       <>
        {/* Banner Section */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 ">
            <section

            className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                        bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/blog/home/brisbanecarpetpestexperts.jpg')" }}
            >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                Our Blog
                </h1>
                <p className="text-white text-base md:text-lg max-w-2xl">
                This is the description text that appears inside the banner. It is responsive and centered.
                </p>
            </div>
            </section>

            <section>
                {/* Blog content will go here */}

                {/* Main Wrapper */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

                    {/* Layout: Left = content, Right = sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:col-span-2">

                        {/* Hero Image */}
                        <div className="w-full rounded-lg overflow-hidden">
                        <img src="/assets/blog/pages/carpet-and-pest-cleaning.jpg"
                        // /assets/blog/home/brisbanecarpetpestexperts.jpg
                            className="w-full h-auto object-cover"
                            alt="Cutting boards and kitchen decor" />
                        </div>

                        {/* Article Metadata */}
                        <div className="mt-6 text-sm">
                        <span className="text-orange-500 font-semibold">BoldThemes</span>
                        </div>

                        {/* Title */}
                        <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
                        Choosing the Right Carpet and Pest Cleaning Service in Brisbane
                        </h1>

                        {/* Date + Category */}
                        <div className="flex flex-wrap items-center text-gray-500 text-sm mt-3 gap-4">
                        <span>📅 July 20, 2025</span>
                        <span>🧰 DIY, Guides</span>
                        </div>

                        {/* Article Body */}
                        <div className="mt-6 leading-relaxed text-gray-700 space-y-4">
                        <p>
                           Selecting reliable carpet and pest cleaning services in Brisbane is crucial for maintaining a clean, healthy environment in homes and businesses. Whether you’re seeking carpet cleaning to refresh your floors or pest control to safeguard against unwanted invaders, this guide outlines key factors to consider and tips for evaluating service providers in Brisbane. Importance of Professional Cleaning Services.
                        </p>
                        </div>

                        {/* Share Icons */}
                        <div className="mt-8 flex items-center gap-3 text-gray-600">
                        <span className="font-semibold">Share:</span>
                        <button className="hover:text-orange-500">🔗</button>
                        <button className="hover:text-orange-500">👍</button>
                        <button className="hover:text-orange-500">🐦</button>
                        <button className="hover:text-orange-500">📧</button>
                        </div>

                        {/* Continue Reading */}
                        <div className="mt-8">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
                            Continue reading →
                        </button>
                        </div>

                    </div>
                    {/* END LEFT COLUMN */}

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-10">

                        {/* Search */}
                        <div>
                        <input type="text"
                            placeholder="Search..."
                            className="w-full border rounded-full px-4 py-2 focus:ring-orange-400 focus:outline-none"
                        />
                        </div>

                        {/* Recent Posts */}
                        <div>
                        <h2 className="font-bold text-lg mb-4">Recent Posts</h2>

                        <div className="space-y-4">

                            {/* Post Item */}
                            <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div>
                                <p className="text-xs text-gray-500">July 20, 2025</p>
                                <p className="hover:text-orange-500 cursor-pointer">How to Clean All Types of Cutting Boards</p>
                            </div>
                            </div>

                            <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div>
                                <p className="text-xs text-gray-500">July 10, 2025</p>
                                <p className="hover:text-orange-500 cursor-pointer">How To Clean and Maintain Wood Utensils</p>
                            </div>
                            </div>

                            <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div>
                                <p className="text-xs text-gray-500">June 30, 2025</p>
                                <p className="hover:text-orange-500 cursor-pointer">Best Robot Vacuums 2025</p>
                            </div>
                            </div>

                        </div>
                        </div>

                        {/* Categories */}
                        <div>
                        <h2 className="font-bold text-lg mb-4">Categories</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li className="hover:text-orange-500 cursor-pointer">Business</li>
                            <li className="hover:text-orange-500 cursor-pointer">Cleaning</li>
                            <li className="hover:text-orange-500 cursor-pointer">DIY</li>
                            <li className="hover:text-orange-500 cursor-pointer">Guides</li>
                            <li className="hover:text-orange-500 cursor-pointer">Organising</li>
                            <li className="hover:text-orange-500 cursor-pointer">Services</li>
                            <li className="hover:text-orange-500 cursor-pointer">Tips & Tricks</li>
                        </ul>
                        </div>

                    </div>
                    {/* END SIDEBAR */}

                    {/* LEFT COLUMN (Content) */}
                    <div className="lg:col-span-2">

                        {/* Hero Image */}
                        <div className="w-full rounded-lg overflow-hidden">
                        <img src="/assets/blog/pages/weather-conditions-affect.jpg"
                        // /assets/blog/home/brisbanecarpetpestexperts.jpg
                            className="w-full h-auto object-cover"
                            alt="Cutting boards and kitchen decor" />
                        </div>

                        {/* Article Metadata */}
                        <div className="mt-6 text-sm">
                        <span className="text-orange-500 font-semibold">BoldThemes</span>
                        </div>

                        {/* Title */}
                        <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
                        How Weather Conditions Affect Pest Activity in Brisbane
                        </h1>

                        {/* Date + Category */}
                        <div className="flex flex-wrap items-center text-gray-500 text-sm mt-3 gap-4">
                        <span>📅 July 20, 2025</span>
                        <span>🧰 DIY, Guides</span>
                        </div>

                        {/* Article Body */}
                        <div className="mt-6 leading-relaxed text-gray-700 space-y-4">
                        <p>
                           Brisbane’s subtropical climate provides a diverse habitat for pests, influencing their behavior and seasonal activity patterns throughout the year. Understanding how weather conditions impact pest infestations is crucial for proactive pest management in homes and businesses. This guide explores Brisbane’s climate, seasonal pest activity, weather-related attractants, prevention tips, and strategies for effective pest control based on weather patterns.
                        </p>
                        </div>

                        {/* Share Icons */}
                        <div className="mt-8 flex items-center gap-3 text-gray-600">
                        <span className="font-semibold">Share:</span>
                        <button className="hover:text-orange-500">🔗</button>
                        <button className="hover:text-orange-500">👍</button>
                        <button className="hover:text-orange-500">🐦</button>
                        <button className="hover:text-orange-500">📧</button>
                        </div>

                        {/* Continue Reading */}
                        <div className="mt-8">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2">
                            Continue reading →
                        </button>
                        </div>

                    </div>
                    {/* END LEFT COLUMN */}

                    </div>
                </div>
            </section>
        
        </div>
       </>
    );

}