"use client";

import Image from "next/image";
import { useState } from "react";
// import Link from "next/link";
// import { ChevronDown } from "lucide-react"; // added import

export default function HomeAboutCard() {
   const [faqOpen, setFaqOpen] = useState(false);

  const features = [
    {
      color: {
        bg: 'bg-green-600',
        bgLight: 'bg-green-100',
        text: 'text-green-600',
        hoverText: 'group-hover:text-green-600'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Professional Excellence',
      description: 'Our team of certified professionals brings years of experience and dedication to every cleaning project.'
    },
    {
      color: {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-100',
        text: 'text-orange-500',
        hoverText: 'group-hover:text-orange-500'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Time Efficiency',
      description: 'We value your time and ensure prompt, efficient service without compromising on quality.'
    },
    {
      color: {
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-100',
        text: 'text-blue-600',
        hoverText: 'group-hover:text-blue-600'
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform duration-300 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Guaranteed Satisfaction',
      description: 'We stand behind our work with a 100% satisfaction guarantee on all our cleaning services.'
    }
  ];


  return (
    <div className="bg-[#fffdf8] antialiased"> 
        {/* Home About Section */}
        <main className="bg-[#f9f7f2] text-[#111] font-sans w-full">
                  {/* About Section */}
                   
        
                  {/* Step by Step Section */}
                  <section className="bg-white px-6 md:px-16 py-20">
                    <h3 className="text-orange-500 italic font-semibold">Step by step</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">
                            📅
                          </div>
                          <h4 className="text-xl font-semibold">Booking Made Easy</h4>
                        </div>
                        <p className="text-gray-600 mt-2">
                          Schedule your cleaning online, by phone, or via text. Choose the
                          date, time, and service type that fits your needs.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">
                            🧹
                          </div>
                          <h4 className="text-xl font-semibold">Expert Service</h4>
                        </div>
                        <p className="text-gray-600 mt-2">
                          Our professional team arrives on time and completes the cleaning according to our high standards and your specific requirements.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">
                            ⭐
                          </div>
                          <h4 className="text-xl font-semibold">Personalized Service</h4>
                        </div>
                        <p className="text-gray-600 mt-2">
                          We confirm your booking and tailor the service to your home and
                          preferences.
                        </p>
                      </div>
                    </div>
                  </section>
        
                  {/* Booking Section */}
                  <section className="px-6 md:px-16 py-20">
                    <div className="bg-white rounded-2xl shadow-lg p-10">
                      <h3 className="text-orange-500 italic font-semibold">Get in touch</h3>
                      <h2 className="text-3xl font-bold mb-4">Book Your Clean Today</h2>
                      <form className="space-y-4">
                        <textarea
                          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                          placeholder="Enter your message..."
                          rows={4}
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">
                          Send
                        </button>
                      </form>
                      <p className="text-gray-600 text-sm mt-6">
                        All you have to do is click on the Book Now button, enter your
                        relevant details (name, address, phone number, your home size, and
                        any extras you require). We’ll reply the same business day confirming
                        the appointment and arrival time. You can also call us for live help
                        or chat with us.
                      </p>
                    </div>
                  </section>
        
                  {/* FAQ Section */}
                  <section className="px-6 md:px-16 pb-20">
                    <div className="bg-white rounded-2xl p-6 shadow">
                      <button
                        onClick={() => setFaqOpen(!faqOpen)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <span className="font-semibold text-lg">
                          What services don’t you offer?
                        </span>
                        <span className="text-green-600 text-2xl">
                          {faqOpen ? "−" : "+"}
                        </span>
                      </button>
                      {faqOpen && (
                        <p className="mt-4 text-gray-600">
                          We don’t offer hazardous cleaning, heavy lifting, or outdoor
                          construction cleanup.
                        </p>
                      )}
                    </div>
                  </section>
        </main>
    </div>
  );
}
