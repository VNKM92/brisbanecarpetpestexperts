"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { useForm } from "react-hook-form";

// Note: SEO metadata is managed in parent layout

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  bedrooms: string;
  bathrooms: string;
  message: string;
}

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        reset();
      } else {
        setServerError(json.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setServerError("Network error. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <>
    <section className="bg-[#faf8f3] min-h-screen py-16 relative overflow-hidden">
      {/* Background Text */}
      <h1 className="absolute top-16 left-1/2 -translate-x-1/2 text-[#2f8e44] font-extrabold text-[90px] md:text-[200px] opacity-20 pointer-events-none uppercase">
        contact us
      </h1>

      {/* Main Wrapper */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* ========== FORM ========== */}
        <div data-aos="fade-right">
          <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10">
            <p className="text-center text-orange-500 font-semibold text-lg mb-1">
              Get in touch
            </p>
            <h2 className="text-center font-bold text-3xl md:text-4xl mb-8">
              Book Your Clean Today
            </h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-300 text-green-800 text-center">
                <p className="font-bold text-base">Thank you! Enquiry Received.</p>
                <p className="text-sm mt-1">Our cleaning team will call you within business hours.</p>
              </div>
            )}

            {serverError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-center text-sm">
                {serverError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Input Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("firstName", { required: true })}
                    placeholder="First Name*"
                    className="w-full border px-4 py-3 rounded-xl"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">The field is required.</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("lastName", { required: true })}
                    placeholder="Last Name*"
                    className="w-full border px-4 py-3 rounded-xl"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">The field is required.</p>
                  )}
                </div>
              </div>

              {/* Email / Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    placeholder="Your E-mail*"
                    className="w-full border px-4 py-3 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">Valid email required.</p>
                  )}
                </div>

                <div>
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Phone Number*"
                    className="w-full border px-4 py-3 rounded-xl"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">Phone is required.</p>
                  )}
                </div>
              </div>

              {/* Cleaning Type */}
              <select
                {...register("service")}
                className="w-full border px-4 py-3 rounded-xl"
              >
                <option>Home Cleaning</option>
                <option>Office Cleaning</option>
                <option>Deep Cleaning</option>
              </select>

              {/* Bedrooms / Bathrooms */}
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  {...register("bedrooms")}
                  className="w-full border px-4 py-3 rounded-xl"
                >
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrooms</option>
                </select>

                <select
                  {...register("bathrooms")}
                  className="w-full border px-4 py-3 rounded-xl"
                >
                  <option>2 Bathrooms</option>
                  <option>1 Bathroom</option>
                  <option>3 Bathrooms</option>
                </select>
              </div>

              {/* Message */}
              <textarea
                {...register("message")}
                placeholder="Type your message"
                className="w-full border px-4 py-3 rounded-xl h-32 resize-none"
              />

              {/* Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold rounded-xl py-4 text-lg">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* ========== IMAGE SECTION ========== */}
        <div
          className="flex flex-col items-center gap-8"
          data-aos="fade-left"
        >
          <Image
            src="/worker.png"
            alt="Cleaning worker"
            width={350}
            height={450}
            className="object-contain"
          />

          <Image
            src="/cleaning-tools.png"
            alt="Cleaning tools"
            width={220}
            height={220}
            className="object-contain"
          />
        </div>
      </div>
    </section>
   
    <section className="bg-[#f7f4ef] py-16 px-4">
    {/* <!-- Heading --> */}
    <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-orange-500 font-semibold text-lg">Get in touch</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Have questions or ready to book a cleaning?
        </h2>
        <p className="text-gray-600 mt-4">
        Whether you need a one-time deep clean or recurring service, our friendly
        team is just a message away.
        </p>
    </div>

    {/* <!-- Cards Wrapper --> */}
    <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {/* <!-- Customer Service Card --> */}
        <div
        className="bg-white rounded-3xl shadow-md p-8 flex flex-col border border-gray-100"
        >
        <div className="text-green-600 text-3xl mb-5">
            {/* <!-- Headphone Icon --> */}
            🎧
        </div>

        <h3 className="text-xl font-semibold mb-3">Customer Service</h3>

        <p className="text-gray-600 mb-4">
            Call or text us anytime during business hours
        </p>

        <p className="font-semibold">Monday to Saturday:</p>
        <p className="font-bold text-gray-800">8:00 AM – 6:00 PM</p>

        <p className="mt-2 text-gray-800 font-medium">(844) 242-9464</p>
        </div>

        {/* <!-- Find Us Here Card --> */}
        <div
        className="bg-white rounded-3xl shadow-md p-8 flex flex-col border border-gray-100"
        >
        <div className="text-green-600 text-3xl mb-5">
            {/* <!-- Location Icon --> */}
            📍
        </div>

        <h3 className="text-xl font-semibold mb-3">Find Us Here</h3>

        <p className="text-gray-700 leading-relaxed mb-6">
            Qleen Cleaning Services<br />
            1234 Myrtle Avenue, Suite 2B<br />
            Brooklyn, NY 11221
        </p>

        <button
            className="bg-orange-500 hover:bg-orange-600 transition rounded-full text-white px-6 py-2 text-sm font-semibold w-max"
        >
            View Map
        </button>
        </div>

        {/* <!-- Contact Online / Social Card --> */}
        <div
        className="bg-green-600 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
        >
        <div>
            <h3 className="text-xl font-semibold mb-3">Contact us online or</h3>
            <h3 className="text-xl font-semibold mb-6">via social media</h3>

            <p className="text-white/90 mb-6">office@qleentheme.com</p>

            <div className="flex items-center gap-4">
            <div
                className="border border-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-lg"
            >
                f
            </div>
            <div
                className="border border-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-lg"
            >
                ⧉
            </div>
            <div
                className="border border-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-lg"
            >
                X
            </div>
            <div
                className="border border-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-lg"
            >
                in
            </div>
            </div>
        </div>

        {/* <!-- Right-side Image --> */}
        <img
            src="/hand.png"
            alt="Hand OK"
            className="absolute right-4 bottom-4 w-40 object-contain"
        />
        </div>
    </div>
    </section>

    </>
  );
  
}
