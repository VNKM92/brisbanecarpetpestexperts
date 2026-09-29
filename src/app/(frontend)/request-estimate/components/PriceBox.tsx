"use client";

import { useState } from "react";

export default function PriceBox({ total, estimateData }: { total: number; estimateData?: any }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const activeAddons = estimateData?.addons
        ? Object.keys(estimateData.addons).filter((k) => estimateData.addons[k])
        : [];

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          serviceName: estimateData?.homeType ? `${estimateData.homeType} Cleaning` : "Home Cleaning",
          serviceAddress: serviceAddress || "Brisbane, QLD",
          scheduledDate: scheduledDate || undefined,
          timeSlot: estimateData?.time || "During Business Hours",
          squareFootage: estimateData?.square || 800,
          rooms: estimateData?.rooms || 1,
          bathrooms: estimateData?.bathrooms || 1,
          addons: activeAddons,
          totalPrice: total,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessBooking(json.data);
      } else {
        setErrorMsg(json.message || "Failed to create booking.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mt-10">
        <div className="bg-green-700 text-white px-8 py-3 rounded-lg text-xl font-bold">
          ${total.toFixed(2)}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg font-semibold transition cursor-pointer"
        >
          CONFIRM & BOOK
        </button>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setSuccessBooking(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>

            {successBooking ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="text-sm text-gray-600">
                  Your reference number is{" "}
                  <strong className="text-green-700 font-mono text-base">
                    {successBooking.bookingNumber}
                  </strong>
                </p>
                <p className="text-xs text-gray-500">
                  Our dispatch coordinator will reach out shortly with cleaner arrival details.
                </p>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSuccessBooking(null);
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Book Your Cleaning Job</h3>
                <p className="text-xs text-gray-500 mb-5">
                  Instant Estimate Total: <strong className="text-green-700">${total.toFixed(2)} AUD</strong>
                </p>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs text-gray-700">
                  <div>
                    <label className="font-semibold block mb-1">Full Name*</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Phone Number*</label>
                      <input
                        type="text"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0434 061 188"
                        className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Email*</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Service Address*</label>
                    <input
                      type="text"
                      required
                      value={serviceAddress}
                      onChange={(e) => setServiceAddress(e.target.value)}
                      placeholder="123 Street Name, Brisbane QLD"
                      className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Preferred Service Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full border rounded-xl p-2.5 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition text-sm mt-2 disabled:opacity-50"
                  >
                    {submitting ? "Booking..." : "Submit Booking Request"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
