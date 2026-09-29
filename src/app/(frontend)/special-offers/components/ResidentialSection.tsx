"use client";

import Image from "next/image";

export default function ResidentialSection() {
  return (
    <> 
    <section className="w-full flex justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-md p-6 md:p-12 flex flex-col md:flex-row gap-10">
        
        {/* LEFT — IMAGE */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto">
          <Image
            src="/assets/home/image/brisbanecarpetpestexperts-index-image4-1.jpg" // replace with your image path
            alt="Person cleaning a window"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Residential
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            For residential properties in Brisbane, Bond Cleaning Brisbane
            provides meticulous end-of-lease cleaning services tailored to meet
            the stringent requirements of property managers and landlords,
            ensuring a smooth transition for tenants. Our Pre Sale-Cleaning
            Brisbane service prepares homes for sale by offering deep cleaning
            solutions that enhance property appeal and value.
            Additionally, our Pest Control Brisbane service specializes in
            safeguarding homes against common pests, providing comprehensive
            treatments to protect your family and property.
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold">
              Purchase Now →
            </button>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "Window frames and ledges",
              "Hard flooring surfaces",
              "Eliminate cobwebs",
              "Exterior surfaces of appliances",
              "Stovetops and ovens",
              "Cabinet exteriors",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* 2nd */}
            <section className="w-full flex justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-md p-6 md:p-12 flex flex-col md:flex-row gap-10">
        
        {/* RIGHT — TEXT CONTENT */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Commercial
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our commercial cleaning services in Brisbane cater to businesses of all sizes, with Bond Cleaning Brisbane offering efficient end-of-lease cleaning solutions that ensure compliance with commercial tenancy agreements. Pre Sale-Cleaning Brisbane prepares commercial properties for market, enhancing their appeal to potential buyers or tenants. Moreover, our Pest Control Brisbane service provides tailored solutions to protect commercial premises from pests, safeguarding business operations and reputation.

          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold">
              Purchase Now →
            </button>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "Office Complexes",
              "Government Facilities",
              "Manufacturing Plants",
              "Financial Centers",
              "Educational Institutions",
              "Religious Establishments",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* LEFT — IMAGE */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto">
          <Image
            src="/assets/home/image/brisbanecarpetpestexperts-slider-image-640x716.jpg" // replace with your image path
            alt="Person cleaning a window"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        
      </div>
    </section>

    {/* 3rd */}
    <section className="w-full flex justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-md p-6 md:p-12 flex flex-col md:flex-row gap-10">
        
        {/* LEFT — IMAGE */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto">
          <Image
            src="/assets/home/image/Eco-FriendlyCarpetCleaningSolutions.jpg" // replace with your image path
            alt="Person cleaning a window"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Outdoor
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Bond Cleaning Brisbane extends its services beyond indoor spaces with outdoor cleaning solutions that enhance property aesthetics and curb appeal. Our End Of Lease Cleaning Brisbane includes thorough cleaning of outdoor areas, ensuring they meet the standards required for lease agreements. Pre Sale-Cleaning Brisbane prepares outdoor spaces for sale, enhancing their attractiveness to potential buyers. Additionally, our Pest Control Brisbane service addresses outdoor pest issues, providing effective treatments to create a pest-free environment around your property.
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold">
              Purchase Now →
            </button>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            {[
              "Power Washing",
              "Surface Scrubbing",
              "Facade Washing",
              "Parking Lot Sweeping",
              "Wood and Stone Care",
              "Vandalism Eradication",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-600 text-xl">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
