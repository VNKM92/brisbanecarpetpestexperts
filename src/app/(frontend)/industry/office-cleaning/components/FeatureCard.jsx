import React from "react";
import FAQSection from "./FAQSection";
import faqData from ".././data/faq.json";

export default function FeatureCard() {
   const features = [
    {
      title: "Safe Teams and Social Distancing",
      description:
        "Our cleaning teams follow strict social distancing guidelines, ensuring both staff safety and a hygienic environment for residents.",
      icon: "/icons/hand-sanitize.png",
    },
    {
      title: "High-Quality Disinfectants",
      description:
        "We use only professional-grade disinfectants to eliminate harmful bacteria and viruses, ensuring a safer, cleaner facility.",
      icon: "/icons/disinfectant.png",
    },
    {
      title: "Sanitized & Cleaned Equipment",
      description:
        "Our cleaning tools are sterilized and disinfected after each use, preventing cross-contamination.",
      icon: "/icons/equipment.png",
    },
    {
      title: "Guaranteed Complete Satisfaction",
      description:
        "We offer a 100% satisfaction guarantee, ensuring your facility meets the highest standards of cleanliness.",
      icon: "/icons/satisfaction.png",
    },
  ];

  return (
    <>
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 max-w-7xl mx-auto px-6 py-20">
            <div className="mt-3 max-w-6xl mx-auto">
              
               <h2 className="text-xl md:text-4xl font-bold text-gray-800 mt-5">
              Exciting Offers
              </h2>
              <p className="flex justify-start text-gray-600  mt-4">
             Discover exceptional value with our exciting offers on office cleaning services! At Brisbane Carpet and Pest Control, we understand the importance of maintaining a pristine workplace, and our tailored cleaning packages ensure a spotless, professional environment. Whether you're looking for regular maintenance or a one-time deep clean, our special offers make top-notch office cleaning both affordable and convenient. Trust our expert team to deliver unparalleled service and keep your office looking its best. Explore our current promotions and experience the difference that quality cleaning can make for your business!
            </p>

            <h2 className="text-xl md:text-4xl font-bold text-gray-800 mt-5">
              Reasons to Choose Us!
            </h2>
          
            <p className="flex justify-start text-gray-600  mt-4">
              At Brisbane Carpet and Pest Control, we understand that a clean office environment is crucial for productivity and professionalism. Our dedicated team of cleaning experts offers tailored solutions to ensure your workspace remains spotless and welcoming. We use advanced cleaning techniques and eco-friendly products to tackle every corner, from carpets to hard surfaces, while minimizing disruption to your daily operations. With a commitment to excellence and attention to detail, we guarantee thorough and reliable service. Our flexible scheduling and customized cleaning plans are designed to meet your unique needs, providing you with peace of mind and a pristine office. Trust us to deliver exceptional results, allowing you to focus on what matters most—your business.
            </p>
            </div>
         </div>
        <section className="bg-gradient-to-b from-green-50 to-green-100 max-w-7xl mx-auto px-6 py-20">
    
          {/* <!-- Header Text --> */}
          <div className="text-center mb-16">
            <p className="text-green-900 text-xl font-medium mb-2">
              See Why Homeowners Like Us!
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Reasons to Choose Us! <br />
              Trusted Carpet Cleaning Services
            </h1>
            
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 soft-glow"
              >
                <div className="mb-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}




          </div>
          
         </section>


         <section className="bg-green-50 max-w-7xl mx-auto px-6 py-20">
    
          {/* <!-- Header Text --> */}
          <div className="text-center mb-16">
                <p className="text-green-900 text-3xl font-medium mb-2">
                  Essential Benefits
                </p>
               <FAQSection categories={faqData.categories} />
            </div>

            </section>  
         
    </>
  );
}
