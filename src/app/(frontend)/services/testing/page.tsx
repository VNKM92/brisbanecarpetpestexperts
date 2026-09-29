import Image from "next/image";
import ServicesCarousel from "./components/ServicesCarousel";
import EstimateForm from "./components/EstimateForm";

export default function Home() {
  return (
    <section className="w-full min-h-screen pt-10 pb-20 bg-[#f7f5f1]">

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Popular Services by Brisbane</h1>

        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600"></span>
            Background checked cleaners
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600"></span>
            Insurance coverage up to $1M
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-600"></span>
            No Contracts or Commitments
          </div>
        </div>
      </div>

      {/* Slider */}
      <ServicesCarousel />

      {/* Estimate + Image Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow mt-20 overflow-hidden flex flex-col md:flex-row">

        <EstimateForm />

        {/* Right Image */}
        <div className="w-full md:w-1/2 relative">
          <Image
            src="/images/cleaner.jpg"
            alt="Cleaner"
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />

          {/* Trusted badge */}
          <div className="absolute bottom-4 left-4 bg-white shadow px-4 py-2 flex items-center gap-3 rounded-full">
            <div className="flex -space-x-3">
              <Image src="/images/user1.jpg" width={40} height={40} className="rounded-full" alt="client" />
              <Image src="/images/user2.jpg" width={40} height={40} className="rounded-full" alt="client" />
              <Image src="/images/user3.jpg" width={40} height={40} className="rounded-full" alt="client" />
            </div>
            <p className="text-sm font-medium">Trusted by 200+ clients</p>
          </div>

        </div>
      </div>


      {/* new furniture */}

      <div className="flex items-center gap-3 mt-10 relative">

        <span className="absolute -top-6 left-0 text-white text-lg font-semibold opacity-0 animate-fade-in">
          Furniture Cleaning
        </span>

        <div className="w-10 h-10 bg-orange-500 rounded-full shadow-[0_0_12px_rgba(255,140,0,0.6)]"></div>

        <div className="relative flex-1">

          <div className="h-[3px] bg-orange-500 origin-left animate-draw-line"></div>

          <div className="w-4 h-4 bg-orange-500 rounded-full absolute right-0 top-1/2 -translate-y-1/2
                shadow-[0_0_10px_rgba(255,140,0,0.6)] animate-pop"></div>
        </div>

      </div>



      {/* mm */}

      <div className="flex items-center gap-3 mt-10 relative">

        {/* <!-- Title --> */}
        <span className="absolute -top-6 left-0 text-white text-lg font-semibold opacity-0 animate-fade-in">
          Furniture Cleaning
        </span>

        {/* <!-- BIG left circle with gradient --> */}
        <div className="w-12 h-12 rounded-full shadow-[0_0_14px_rgba(255,165,0,0.7)]
              bg-gradient-to-br from-orange-500 to-yellow-400">
        </div>

        {/* <!-- Curved line + end circle --> */}
        <div className="relative flex-1">

          {/* <!-- SVG curved line --> */}
          <svg className="w-full h-10" viewBox="0 0 200 40" fill="none">
            <path id="curvedLine"
              d="M 0 20 Q 100 0 200 20"
              stroke="url(#grad)"
              stroke-width="3"
              className="animate-draw-path" />

            {/* <!-- gradient definition --> */}
            <defs>
              <linearGradient id="grad" x1="0" x2="200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#f97316" />  {/* <!-- orange --> */}
                <stop offset="100%" stop-color="#facc15" /> {/* <!-- yellow --> */}
              </linearGradient>
            </defs>
          </svg>

          {/* <!-- End circle with gradient --> */}
          <div className="w-5 h-5 rounded-full absolute right-0 top-[19px]
                bg-gradient-to-br from-orange-500 to-yellow-400
                shadow-[0_0_10px_rgba(255,165,0,0.6)]
                animate-pop">
          </div>
        </div>
      </div>


    </section>
  );
}

// 🌟 What This Version Includes
// ✔ Curved animated SVG line

// Soft curve: M 0 20 Q 100 0 200 20
// Animated drawing effect.

// ✔ Large left circle only

// Increased to w-12 h-12.

// ✔ Gradient circles

// bg-gradient-to-br from-orange-500 to-yellow-400

// ✔ Glowing shadows

// Soft ambient glow matching your design.