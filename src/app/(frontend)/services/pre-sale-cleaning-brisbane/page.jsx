"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import WhyUs from "./components/WhyUs";
import ServicesSidebar from "./components/ServicesSidebar";

// Note: SEO metadata is managed in parent layout for client components

const TAB_DATA = {
  residential: {
    title: "Residential",
    icon: "🏠",
    description: "Professional pre-sale cleaning for homes and apartments. We ensure every room is spotless and ready to impress potential buyers with meticulous attention to detail.",
    features: [
      "Deep cleaning of all rooms",
      "Carpet and floor polishing",
      "Kitchen and bathroom detailing",
      "Yard and outdoor presentation"
    ],
    price: "From $500"
  },
  commercial: {
    title: "Commercial",
    icon: "🏢",
    description: "Pre-listing cleaning for commercial properties, offices, and retail spaces. We prepare your business property to attract quality tenants and investors.",
    features: [
      "Professional office cleaning",
      "Lobby and entrance polish",
      "Carpet care and maintenance",
      "Windows and exterior cleaning"
    ],
    price: "From $800"
  },
  outdoor: {
    title: "Outdoor",
    icon: "🏡",
    description: "Complete outdoor presentation including pressure washing, landscaping touch-ups, and patio cleaning. Make the best first impression with your property's exterior.",
    features: [
      "Pressure washing driveways",
      "Deck and patio cleaning",
      "Landscaping refresh",
      "Debris removal and cleanup"
    ],
    price: "From $400"
  }
};

export default function EndofleasePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("outdoor");

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
            Pre Sale-Cleaning Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Prepare your property for sale with our professional pre-sale cleaning services in Brisbane. Our meticulous cleaning ensures your property looks its best, attracting potential buyers and maximizing its market value. Trust our team for thorough cleaning solutions tailored to meet your specific needs and exceed your expectations.</p>
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
                 Preparing a property for sale requires more than just staging; it demands a pristine presentation that appeals to potential buyers and enhances its marketability. At Pre Sale-Cleaning Brisbane, we specialize in comprehensive pre-sale cleaning services designed to transform your property into a showpiece. Our expert team meticulously attends to every detail, from deep cleaning surfaces to refreshing interiors, ensuring your property stands out in the competitive real estate market.
                 <br className="hidden sm:inline" />

                 With a focus on quality and attention to detail, we tailor our cleaning solutions to meet the specific needs of each property. Whether it's a compact apartment or a spacious family home, our cleaning specialists are equipped to handle any size or type of property with efficiency and professionalism. By choosing Pre Sale-Cleaning Brisbane, you can rest assured that your property will make a lasting impression on potential buyers, helping you achieve a faster sale at the best possible price.
                   <br className="hidden sm:inline" />

                  Our commitment to excellence extends beyond cleanliness; we understand the importance of timing and presentation in real estate transactions. That's why we offer flexible scheduling options to accommodate your listing timeline, ensuring your property is ready for open houses and inspections. Backed by years of experience and industry expertise, our team is dedicated to delivering outstanding results that exceed your expectations and enhance the overall appeal of your property.
                  <br className="hidden sm:inline" />

                 Whether you're a homeowner, real estate agent, or property investor, Pre Sale-Cleaning Brisbane is your trusted partner in preparing properties for sale. Experience the difference our professional cleaning services can make in showcasing your property's full potential and attracting discerning buyers who appreciate the value of a well-maintained home. Let us help you achieve a successful sale by ensuring your property shines from top to bottom, inside and out.
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
                        onClick={() => setActiveTab(key)}
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
