"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WhyUs from "./components/WhyUs";
import ServicesSidebar from "./components/ServicesSidebar";

// Note: SEO metadata is managed in parent layout for client components

const TAB_DATA = {
  residential: {
    title: "Residential",
    icon: "🏠",
    description: "Professional end-of-lease cleaning for apartments and houses. We ensure every room meets landlord standards for full bond return with meticulous attention to detail.",
    features: [
      "Deep cleaning all rooms",
      "Carpet and floor cleaning",
      "Kitchen and appliance detailing",
      "Window and blind cleaning",
      "Bond back guarantee"
    ],
    price: "From $400",
    services: ["Living Room Cleaning", "Bedroom Cleaning", "Kitchen Deep Clean", "Bathroom Sanitizing", "Carpet Shampooing"]
  },
  commercial: {
    title: "Commercial",
    icon: "🏢",
    description: "End-of-lease cleaning for commercial spaces, offices, and retail properties. We prepare your business space for the next tenant with professional standards.",
    features: [
      "Office space cleaning",
      "Carpet and floor care",
      "Glass and window cleaning",
      "Breakroom sanitizing",
      "Same-day availability"
    ],
    price: "From $600",
    services: ["Office Cleaning", "Floor Polishing", "Glass Cleaning", "Breakroom Deep Clean", "Carpet Care"]
  },
  outdoor: {
    title: "Outdoor",
    icon: "🏡",
    description: "Outdoor end-of-lease cleaning including pressure washing, garden maintenance, and patio cleaning. Make sure the exterior meets all requirements.",
    features: [
      "Pressure washing driveways",
      "Garden and yard maintenance",
      "Patio and deck cleaning",
      "Debris removal",
      "Fence cleaning"
    ],
    price: "From $300",
    services: ["Driveway Pressure Wash", "Garden Cleanup", "Patio Cleaning", "Debris Removal", "Outdoor Sanitizing"]
  }
};

export default function EndofleasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EndOfLeaseContent />
    </Suspense>
  );
}

function EndOfLeaseContent() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("residential");
  const [activeService, setActiveService] = useState(null);
  const searchParams = useSearchParams();

  // Set active tab and service based on URL parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const serviceParam = searchParams.get("service");

    if (tabParam && TAB_DATA[tabParam]) {
      setActiveTab(tabParam);
    }

    if (serviceParam) {
      setActiveService(serviceParam);
    }
  }, [searchParams]);

  return (
    <>
        {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
             End Of Lease Cleaning Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Secure Your Bond with Our Comprehensive End-of-Lease Cleaning Services in Brisbane. We Guarantee a Thorough Clean to Meet Your Landlord's Standards.</p>
          </div>
        </section>
        <div className="w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* Services */}
               <ServicesSidebar />
               

              {/* Homeowners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-emerald-400 rounded-xl p-6 text-white shadow-md"
              >
                <h3 className="text-xl font-bold">
                  Safe and nurturing surroundings for your loved ones
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  We ensure top-notch cleaning quality backed by established processes and safety.
                </p>

                <button className="mt-4 bg-white text-emerald-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                  Explore Our Offers →
                </button>

                <p className="mt-4 text-sm">📞 0434061188</p>
              </motion.div>

              {/* Brochure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-4">Download Brochure</h2>

                <button className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-emerald-400 hover:text-white transition mb-2">
                  Company Report 2025
                </button>

                <button className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-emerald-400 hover:text-white transition">
                  Company Brochure
                </button>
              </motion.div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 space-y-10">

              {/* Overview */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                 End of lease cleaning, also known as bond cleaning, is an essential service for tenants looking to secure the return of their bond deposit. At the conclusion of a rental agreement, properties must meet specific cleanliness standards set by landlords and property managers. Our professional end of lease cleaning services in Brisbane are designed to help tenants meet these standards, ensuring a smooth and hassle-free transition.  
                 <br className="hidden sm:inline" />

                  Our comprehensive cleaning service covers every aspect of the property, including detailed cleaning of living areas, bedrooms, kitchens, and bathrooms. We pay special attention to high-traffic areas and commonly overlooked spots to ensure that the property is spotless. Additionally, we offer specialized cleaning services such as carpet steam cleaning, window washing, and garden maintenance to meet all requirements. 
                   <br className="hidden sm:inline" />

                  Customer satisfaction is our top priority. Our experienced and professional cleaning team uses high-quality, eco-friendly cleaning products to achieve exceptional results while minimizing environmental impact. We offer flexible scheduling options, including evenings and weekends, to accommodate your moving timeline. With our meticulous approach and dedication to quality, we provide a bond back guarantee, giving you peace of mind and confidence in our services.
                  <br className="hidden sm:inline" />

                  Whether you are moving out of a small apartment or a large house, our end of lease cleaning services are tailored to meet your specific needs. Trust us to handle the cleaning, so you can focus on settling into your new home.
                </p>
              </motion.div>

              {/* Outdoor Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-orange-300 p-6 rounded-xl"
              >
                <div className="bg-white p-10 rounded-xl shadow-md">

                  {/* Tab Buttons */}
                  <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    {Object.entries(TAB_DATA).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveTab(key);
                          setActiveService(data.services[0]);
                        }}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                          activeTab === key
                            ? "bg-emerald-500 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {data.icon} {data.title}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="text-3xl font-bold mb-4 text-emerald-500">
                        {TAB_DATA[activeTab].title}
                      </h3>

                      <p className="text-gray-700 max-w-xl mx-auto mb-6">
                        {TAB_DATA[activeTab].description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-left max-w-lg mx-auto">
                        {TAB_DATA[activeTab].features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="text-emerald-500 text-xl">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="space-y-4">
                        <p className="text-xl font-bold text-emerald-500">
                          {TAB_DATA[activeTab].price}
                        </p>
                        <button className="bg-emerald-400 text-white px-6 py-2 rounded hover:bg-emerald-500 transition font-semibold">
                          Purchase Now →
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Services We Offer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Services We Offer</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TAB_DATA[activeTab].services.map((service, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveService(service)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`p-4 rounded-lg font-semibold transition-all ${
                        activeService === service
                          ? "bg-emerald-500 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {service}
                    </motion.button>
                  ))}
                </div>

                {/* Service Description */}
                {activeService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-6 bg-blue-50 rounded-lg border-l-4 border-emerald-500"
                  >
                    <h3 className="text-lg font-bold text-emerald-600 mb-2">
                      {activeService}
                    </h3>
                    <p className="text-gray-700">
                      Professional {activeService.toLowerCase()} service for {activeTab} properties. We ensure meticulous attention to detail and complete customer satisfaction.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold">Stats & Charts</h2>
                <p className="text-gray-700 mt-2 max-w-2xl">
                  Over 95% of our clients get their full bond back due to our meticulous cleaning.</p>
                  <p className="text-gray-700 mt-2 max-w-2xl"> 
                  We pride ourselves on delivering exceptional results, and our customer satisfaction statistics reflect this. Over 95% of our clients have received their full bond deposit back, thanks to our meticulous cleaning standards. Below are some charts showing our performance metrics and customer feedback ratings.</p>
                  <p className="text-gray-700 mt-2 max-w-2xl"> 
                  Customer satisfaction is a critical metric for any service-oriented business. High satisfaction rates indicate that customers are happy with the service they received and are likely to recommend it to others. Our customer satisfaction rates have consistently been high, demonstrating our commitment to quality and reliability.
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="w-72 h-72 bg-gray-50 rounded-full flex items-center justify-center">

                    <Image
                    src="/assets/home/image/chart.png"
                    alt="Cleaning Team"
                    width={250}
                    height={250}
                    className="object-cover"
                  />
                    <p className="text-gray-500 text-sm">l</p>
                  </div>
                </div>
              </motion.div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold">How It Works?</h2>

                <ul className="mt-4 space-y-3 text-gray-700">
                  <li><b>Booking:</b> Schedule your cleaning online or via phone.</li>
                  <li><b>Inspection:</b> We inspect your property and note requirements.</li>
                  <li><b>Cleaning:</b> Full checklist-driven cleaning.</li>
                  <li><b>Review:</b> Final inspection before handover.</li>
                  <li><b>Completion:</b> Ready for landlord/agent check.</li>
                </ul>
              </motion.div>

              {/* Video / Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg"
                    alt="Cleaning Team"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {/* <button className="bg-white text-emerald-500 px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
                      ▶ Play Video
                    </button> */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="bg-white text-emerald-500 px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                    >
                      ▶ Play Video
                    </button>

                    {/* ================= VIDEO POPUP MODAL ================= */}
                    <AnimatePresence>
                      {showVideo && (
                        <motion.div
                          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Modal Content */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-black rounded-xl shadow-lg overflow-hidden w-[90%] max-w-3xl"
                          >
                            {/* Close Button */}
                            <button
                              onClick={() => setShowVideo(false)}
                              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-emerald-300"
                            >
                              ✕
                            </button>

                            {/* Embedded YouTube Video */}
                            <div className="w-full h-[250px] sm:h-[400px] md:h-[500px]">
                              <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/uQm-0Ex18nM?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </motion.div>
              <WhyUs />
            </div>
          </div>
        </div>
        
    </>
  );
}
