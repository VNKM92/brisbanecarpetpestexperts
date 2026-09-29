import Link from 'next/link';
import ResidentialSection from "./components/ResidentialSection";

// SEO Metadata
export const metadata = {
  title: "Special Offers | Brisbane - Exclusive Cleaning Deals",
  description: "Special offers and discounts on professional cleaning services in Brisbane. Save money on bond cleaning, pest control, and more.",
  keywords: ["cleaning offers", "special deals", "cleaning discounts", "promotion"],
  openGraph: {
    title: "Special Offers | Brisbane Cleaning Services",
    description: "Exclusive offers and discounts on professional cleaning services.",
  },
};

export default function SpecialOffersPage() {

    return (
        <>
            {/* Banner Section */}
                <section
                className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                            bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/assets/blog/price/price-header.jpg')" }}
                >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900/50"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                    Special Offers
                    </h1>
                    <p className="text-white text-base md:text-lg max-w-2xl">
                    At Brisbane Carpet and Pest Control, we’re committed to providing exceptional services at unbeatable value. Our special offers are designed to help you maintain a clean and pest-free home without breaking the bank. Whether you need a deep carpet clean, effective pest control, or a combination of both, our exclusive deals make it easier than ever to get the services you need at a price you’ll love.
                    </p>
                    <Link href="request-estimate">
                        <button className="mt-10"  style={{ padding: '10px 20px',opacity:15,  backgroundColor: 'rgb(255 105 0)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Request an Estimate
                            </button>
                     </Link>
                </div>
                </section>
            {/* End Banner Section */}

            <ResidentialSection />
            <section className="max-w-7xl mx-auto px-6 py-20">

                {/* <!-- Section Title --> */}
                <div className="text-center mb-16">
                <p className="text-green-500 text-xl font-semibold mb-2">Discover Our Process!</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
                    Simple Steps to Achieve a <br /> Clean and Healthy Space
                </h2>
                </div>

                {/* <!-- Timeline Dots --> */}
                <div className="relative flex justify-between items-center mb-20">
                <div className="absolute top-1/2 left-0 w-full border-t border-green-300 -z-10"></div>
                <div className="w-4 h-4 bg-white border-4 border-green-400 rounded-full"></div>
                <div className="w-4 h-4 bg-white border-4 border-green-400 rounded-full"></div>
                <div className="w-4 h-4 bg-white border-4 border-green-400 rounded-full"></div>
                <div className="w-4 h-4 bg-white border-4 border-green-400 rounded-full"></div>
                </div>

                {/* <!-- 4 Step Grid --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

                {/* <!-- Step 1 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Share Your Facility <br /> The Details
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Share specific details about your age care facility, including size and cleaning needs, to help us tailor our services.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 2 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Select the Right <br /> Plan For You
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Choose the cleaning plan that best fits your facility’s requirements and schedule, ensuring it meets all your needs.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/2920/2920248.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 3 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Schedule Online Effortlessly
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Easily schedule your cleaning services online with just a few clicks, making the process quick and convenient.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 4 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Thorough Cleaning & Swift <br /> Departure
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Our team performs thorough cleaning with attention to detail, then leaves promptly to minimize disruption.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/809/809957.png" className="w-14 opacity-70" />
                    </div>
                </div>

                </div>
            </section>

             
        </>
    );

}