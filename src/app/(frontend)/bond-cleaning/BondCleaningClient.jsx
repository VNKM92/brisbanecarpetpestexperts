"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BondCleaningClient() {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <main className="bg-[#f9f7f2] text-[#111] font-sans w-full">

        {/* new section */}
        <section className="pt-32 pb-20 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative"
            >
                <h1 className="text-green-700 text-[8vw] md:text-[6vw] font-extrabold text-qleenGreen leading-none">
                Home Clean
                </h1>
                <p className="text-gray-600 mt-4 max-w-md">
                Experience a spotless home with Brisbane Carpet & Pest Experts' professional cleaning services.
                </p>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
            >
                <Image
                src="/chairwithblancket.png"
                alt="Chair with blanket"
                width={600}
                height={500}
                className="drop-shadow-lg rounded-lg"
                />
            </motion.div>
        </section>

        {/* About Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20">
            <div className="md:w-1/2 space-y-6">
                <h3 className="text-orange-500 italic font-semibold">About us</h3>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Honest. Simple. <span className="text-green-600">Spotless.</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                    <p className="font-semibold text-lg flex items-center gap-2">✅ Trust</p>
                    <p className="text-gray-600 text-sm mt-1">
                    Trust is our paramount value. All of our employees go through
                    work authorization check.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-lg flex items-center gap-2">✅ Quality</p>
                    <p className="text-gray-600 text-sm mt-1">
                    Excellent performance, flat rates, no surprises. Five star
                    rating on Google.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-lg flex items-center gap-2">✅ Care</p>
                    <p className="text-gray-600 text-sm mt-1">
                    Average response time is less than 10 minutes. You can call,
                    e-mail, text or message us.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-lg flex items-center gap-2">✅ People</p>
                    <p className="text-gray-600 text-sm mt-1">
                    We pay good wages, health benefits and retirement, and abide by
                    the laws.
                    </p>
                </div>
                </div>
            </div>

            <div className="relative mt-10 md:mt-0 md:w-1/2 flex justify-center">
                <div className="bg-white rounded-3xl shadow p-10 text-center">
                <h2 className="text-5xl text-green-600 font-bold">96%</h2>
                <p className="text-xl font-semibold">Satisfaction Rate*</p>
                <p className="text-gray-500 text-sm mt-2">*Based on 356 reviews on Google</p>
                <Image src="/aboutus.png" alt="Green glove making OK sign" width={300} height={300} className="mx-auto mt-6" />
                </div>
            </div>
        </section>

        {/* Step by Step Section */}
        <section className="bg-white px-6 md:px-16 py-20">
            <h3 className="text-orange-500 italic font-semibold">Step by step</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                <div>
                <div className="flex items-center gap-4">
                    <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">📅</div>
                    <h4 className="text-xl font-semibold">Booking Made Easy</h4>
                </div>
                <p className="text-gray-600 mt-2">Schedule your cleaning online, by phone, or via text. Choose the date, time, and service type that fits your needs.</p>
                </div>
                <div>
                <div className="flex items-center gap-4">
                    <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl">✅</div>
                    <h4 className="text-xl font-semibold">Personalized Service</h4>
                </div>
                <p className="text-gray-600 mt-2">We confirm your booking and tailor the service to your home and preferences.</p>
                </div>
            </div>
        </section>

        {/* Booking Section */}
        <section className="px-6 md:px-16 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <h3 className="text-orange-500 italic font-semibold">Get in touch</h3>
            <h2 className="text-3xl font-bold mb-4">Book Your Clean Today</h2>
            <form className="space-y-4">
              <textarea className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Enter your message..." rows={4} />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">Send</button>
            </form>
            <p className="text-gray-600 text-sm mt-6">All you have to do is click on the Book Now button, enter your relevant details (name, address, phone number, your home size, and any extras you require). We’ll reply the same business day confirming the appointment and arrival time. You can also call us for live help or chat with us.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-16 pb-20">
          <div className="bg-white rounded-2xl p-6 shadow">
            <button onClick={() => setFaqOpen(!faqOpen)} className="w-full flex justify-between items-center text-left">
              <span className="font-semibold text-lg">What services don’t you offer?</span>
              <span className="text-green-600 text-2xl">{faqOpen ? "−" : "+"}</span>
            </button>
            {faqOpen && <p className="mt-4 text-gray-600">We don’t offer hazardous cleaning, heavy lifting, or outdoor construction cleanup.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
