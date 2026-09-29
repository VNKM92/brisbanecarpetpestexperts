import Link from 'next/link';
import CalculatorCard from "./components/CalculatorCard";
import PricingPlancard from "./components/allsection/pricingplan";

// SEO Metadata
export const metadata = {
  title: "Pricing | Brisbane - Affordable Professional Cleaning Services",
  description: "Transparent pricing for professional cleaning services in Brisbane. Get a free quote or use our pricing calculator. No hidden fees.",
  keywords: ["cleaning prices", "cleaning cost", "cleaning rates", "affordable cleaning"],
  openGraph: {
    title: "Cleaning Pricing | Brisbane Professional Services",
    description: "Transparent and affordable pricing for professional cleaning services.",
  },
};

export default function PricingPage() {

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
                    Our Pricing Plans
                    </h1>
                    <p className="text-white text-base md:text-lg max-w-2xl">
                    At Brisbane Carpet and Pest Control, we believe in providing transparent and competitive pricing for all our services. Our rates are tailored to suit your specific needs, ensuring you receive top-quality service at a fair price.
                    </p>
                    <Link href="/assets/blog/price/Brisbane-Carpet-and-Pest-Control-checklist.pdf" download="Brisbane-Carpet-and-Pest-Control-checklist.pdf">
                        <button  style={{ padding: '10px 20px',opacity:15,  backgroundColor: 'rgb(255 105 0)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Oure Checklist
                            </button>
                     </Link>
                </div>
                </section>
            {/* End Banner Section */}

            <PricingPlancard />

            <section className="max-w-7xl mx-auto px-6 py-20">

                {/* <!-- Section Title --> */}
                <div className="text-center mb-16">
                <p className="text-green-500 text-xl font-semibold mb-2">Discover Our Process!</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
                    Achieving a Clean and Healthy  <br /> Environment Made Simple
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
                    Please Furnish Us With <br /> The Particulars
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Kindly provide us with the necessary details so we can assist you promptly and accurately. Your information helps us tailor our services to meet your specific needs and ensure a seamless experience.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 2 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Choose the Appropriate
                    <br /> Plan for You
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Select the plan that best suits your requirements and property size. A basic clean for a smaller space or a comprehensive service for a larger property, we have options designed to cater to your needs and budget.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/2920/2920248.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 3 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Effortless Booking <br />
                        Made Simple
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Our streamlined booking process allows you to schedule your cleaning with ease. Just a few clicks are all it takes to secure your preferred date and time, making booking our services quick and hassle-free.
                    </p>
                    <div className="flex justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" className="w-14 opacity-70" />
                    </div>
                </div>

                {/* <!-- Step 4 --> */}
                <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                    Cleaning with Care & <br /> Leaving Quickly
                    </h3>
                    <p className="text-gray-500 mb-6">
                    Our thorough attention to detail ensures every corner is spotless before we finish. Our efficient cleaning methods minimize disruption to your schedule, ensuring you can enjoy a freshly cleaned space promptly.
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