"use client";

export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Share Your Facility Details",
      text: `By providing us with your specific requirements, you ensure that our cleaning service 
      is tailored precisely to your hotel's needs. This step allows us to customize our approach, 
      ensuring that every corner of your property is cleaned to the highest standard, enhancing 
      guest satisfaction and maintaining your establishment’s reputation.`,
      icon: "/icons/mop.png",
    },
    {
      number: "02",
      title: "Select the Right Plan",
      text: `Choose from a range of cleaning plans designed to fit different needs and budgets. 
      Whether you require daily maintenance or a one-time deep clean, our flexible options allow 
      you to select the perfect plan that aligns with your hotel's requirements, ensuring efficient 
      and cost-effective cleaning solutions.`,
      icon: "/icons/plan.png",
    },
    {
      number: "03",
      title: "Schedule Online Effortlessly",
      text: `With our user-friendly online scheduling system, booking your cleaning service is quick 
      and hassle-free. In just a few clicks, you can arrange for our team to visit your hotel at a 
      time that suits you, making the process convenient and ensuring minimal disruption to your 
      hotel’s operations.`,
      icon: "/icons/schedule.png",
    },
    {
      number: "04",
      title: "Thorough Cleaning & Swift Departure",
      text: `Our team of professionals is trained to clean with precision and care, respecting your 
      hotel’s environment and ensuring minimal disturbance. We focus on efficiency, completing the 
      job swiftly without compromising on quality, so your hotel is ready for guests in no time.`,
      icon: "/icons/clean.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-green-500 font-semibold text-lg mb-2">
          Discover Our Process!
        </p>

        <h2 className="text-4xl font-bold text-green-700 mb-16 leading-tight">
          Simple Steps to Achieve a <br /> Clean and Healthy Space
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-white shadow-lg rounded-xl px-6 py-10 hover:shadow-xl transition-all duration-300"
            >
              {/* Step Number (faded) */}
              <span className="absolute top-3 left-1/2 -translate-x-1/2 text-gray-300 text-6xl font-bold pointer-events-none select-none">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-lg mt-5 font-bold mb-4 text-gray-900">
                {step.title}
              </h3>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {step.text}
              </p>

              {/* Icon */}
              <div className="flex justify-center">
                <img src={step.icon} className="w-12 h-12 opacity-80" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
