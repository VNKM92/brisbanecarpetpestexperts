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
             Discover unbeatable value with our exclusive hot offers on hotel cleaning services in Brisbane! At Brisbane Carpet and Pest Control, we understand the importance of maintaining impeccable cleanliness for your hotel. Our special promotions are designed to provide top-notch cleaning solutions while maximizing your savings. Whether you need regular deep cleaning or specialized treatments, our team delivers exceptional results with precision and care. Don’t miss out on these limited-time offers to enhance your hotel’s hygiene standards and guest satisfaction. Contact us today to take advantage of our fantastic deals and ensure a pristine environment for your guests.
            </p>

            <h2 className="text-xl md:text-4xl font-bold text-gray-800 mt-5">
              Reasons to Choose Us!
            </h2>
          
            <p className="flex justify-start text-gray-600  mt-4">
              At Brisbane Carpet and Pest Control, we specialize in delivering unparalleled hotel cleaning services tailored to meet the unique needs of your establishment. Our expert team combines cutting-edge technology with eco-friendly cleaning solutions to ensure your hotel maintains the highest standards of cleanliness and hygiene. With a focus on meticulous attention to detail and a commitment to exceeding guest expectations, we provide reliable and efficient cleaning that enhances your hotel's reputation. Choose us for a spotless, inviting environment that reflects the quality and excellence your guests deserve.
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
