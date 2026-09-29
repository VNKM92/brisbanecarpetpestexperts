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
              In today’s fast-paced world, finding the best deals and getting exceptional value for your money is more important than ever. At Brisbane Carpet and Pest Control, we understand the need for both quality and affordability, which is why we proudly present our exclusive hot offers. These specially curated promotions are designed to provide you with unparalleled savings on a broad spectrum of products and services, ensuring that you get the best deals available, whether you're shopping for essentials or indulging in luxury.
            </p>

            <p className="flex justify-start text-gray-600  mt-4">
              Our hot offers are not just about discounts; they are about delivering real value to you. We meticulously select and tailor these offers to meet diverse needs and budgets, ensuring that everyone can find something that suits their requirements. Whether you’re looking for cost-effective solutions or premium products at reduced prices, our hot offers have you covered.
            </p>




            <h2 className="text-xl md:text-4xl font-bold text-gray-800 mt-5">
              Why Choose Cleaning Services?
            </h2>
          
            <p className="flex justify-start text-gray-600  mt-4">
              When it comes to maintaining a clean and hygienic environment in age care facilities, the stakes are undeniably higher. The well-being and overall health of elderly residents hinge significantly on the cleanliness and sanitation of their surroundings. An age care facility is not just a place where people live; it is their home, their sanctuary, and it’s crucial that this environment is kept in optimal condition to support their health and comfort. Hence, selecting a cleaning service that deeply understands and addresses these unique needs is not just important—it's essential.
            </p>

            <p className="flex justify-start text-gray-500 leading-tight mt-4">
              At Brisbane Carpet and Pest Control, we recognize the critical importance of providing specialized age care cleaning services. We are dedicated to ensuring that our cleaning practices go beyond the surface to address the specific requirements of age care environments. Our goal is to create a safe, comfortable, and healthy atmosphere for both residents and staff, and we achieve this through a range of tailored services designed specifically for the unique challenges faced by age care facilities. Here’s why choosing us is the best decision you can make for your age care facility
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
