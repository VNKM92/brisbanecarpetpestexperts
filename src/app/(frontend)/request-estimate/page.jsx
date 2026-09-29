import Link from 'next/link';
import CalculatorCard from "./components/CalculatorCard";
import PricingPlancard from "./components/allsection/pricingplan";

// SEO Metadata
export const metadata = {
  title: "Request Estimate | Brisbane - Free Cleaning Quote",
  description: "Get a free cleaning estimate from Brisbane. Use our instant calculator or submit your details for a personalized quote.",
  keywords: ["cleaning estimate", "free quote", "cleaning calculator", "pricing"],
  openGraph: {
    title: "Request Estimate | Brisbane Cleaning Services",
    description: "Get a free estimate for professional cleaning services.",
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
                    Request An Estimate
                    </h1>
                    <p className="text-white text-base md:text-lg max-w-2xl">
                    At Brisbane Carpet and Pest Control, we make it easy for you to get a customized quote for your cleaning and pest control needs. Whether you're looking for a one-time service or ongoing maintenance, our team is ready to provide you with an accurate estimate tailored to your specific requirements. Simply fill out the form with details about your property and the services you’re interested in, and we’ll get back to you promptly with a competitive quote. Experience hassle-free service with no obligations—request your estimate today!
                    </p>
                    
                    <Link href="/request-estimate"  >
                        <button className="mt-10"  style={{ padding: '10px 20px',opacity:15,  backgroundColor: 'rgb(255 105 0)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Oure Checklist
                            </button>
                     </Link>
                </div>
                </section>
            {/* End Banner Section */}

            {/* <PricingPlancard /> */}
            <main className="px-4 md:px-6 py-8 max-w-6xl mx-auto">
                

                {/* HEADER */}
                <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                    {/* Heading Text */}
                    <div>
                    <p className="text-sm text-orange-600 font-semibold mb-2">
                        Cost Calculator
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        Get a Detailed Estimate for <br className="hidden md:block" />
                        Your Cleaning Needs
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-xl">
                        Use the form below to estimate your home cleaning service. We’ll follow up 
                        with a personalized quote and scheduling options.
                    </p>
                    </div>

                    {/* Right side button + phone */}
                    <div className="flex items-center gap-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow">
                        Book Online
                    </button>
                    <p className="text-orange-600 font-semibold text-lg">0434 061 188</p>
                    </div>
                </header>

                {/* ICONS ROW */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 text-sm text-gray-700">
                    <p className="flex items-center gap-2">🟢 Background checked cleaners</p>
                    <p className="flex items-center gap-2">🟢 No contracts or commitments</p>
                    <p className="flex items-center gap-2">🟢 Easy last-minute bookings</p>
                    <p className="flex items-center gap-2">🟢 Insured up to $1M</p>
                </section>

                {/* MAIN CALCULATOR */}
                <section className="mt-10">
                    <CalculatorCard />
                </section>
            </main>
        </>
    );

}