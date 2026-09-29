"use client";
export default function PricingPlan() {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <p className="text-orange-500 font-semibold">Service Packages</p>
                    <h2 className="text-4xl font-bold mt-2">Choose One Of Our Packages</h2>

                    <div className="flex justify-center mt-4 space-x-6 text-gray-700">
                        <span className="flex items-center gap-1">
                            <span className="text-green-500 text-xl">✔</span> Reliable
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-green-500 text-xl">✔</span> Affordable
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="text-green-500 text-xl">✔</span> Professional
                        </span>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col">
                        <p className="text-orange-500 font-semibold mb-1">Basic package</p>
                        <h3 className="text-2xl font-bold">Fresh Start</h3>

                        <p className="flex items-center gap-2 text-gray-700 mt-3">
                            <span className="text-green-500 text-xl">✔</span>
                            Light maintenance, small apartments, regular upkeep
                        </p>

                        <p className="text-4xl font-bold mt-6">$90</p>
                        <p className="text-gray-500 text-sm">Per visit (up to 2 bed / 1 bath)</p>

                        <button className="mt-6 border-2 border-orange-400 text-gray-700 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
                            Continue
                        </button>

                        <hr className="my-6" />

                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Dusting all surfaces</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Vacuuming & mopping floors</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Kitchen wipe-down</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Bathroom cleaning</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Trash removal</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-600 relative flex flex-col">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                            Most Popular
                        </div>

                        <p className="text-orange-500 font-semibold mb-1">Standard Package</p>
                        <h3 className="text-2xl font-bold">Comfort Clean</h3>

                        <p className="flex items-center gap-2 text-gray-700 mt-3">
                            <span className="text-green-500 text-xl">✔</span>
                            Families, regular home care, busy professionals
                        </p>

                        <p className="text-4xl font-bold mt-6">$130</p>
                        <p className="text-gray-500 text-sm">Per visit (up to 3 bed / 2 bath)</p>

                        <button className="mt-6 bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition">
                            Continue
                        </button>

                        <hr className="my-6" />

                        <p className="font-semibold mb-3">Includes everything in Basic, plus:</p>

                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Make beds/change linens</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Inside microwave</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Baseboard wipe-down</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Spot wall cleaning</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Light fixture & fan dusting</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col">
                        <p className="text-orange-500 font-semibold mb-1">Premium Package</p>
                        <h3 className="text-2xl font-bold">Deep Refresh</h3>

                        <p className="flex items-center gap-2 text-gray-700 mt-3">
                            <span className="text-green-500 text-xl">✔</span>
                            Seasonal deep clean, first-time clients, post-event
                        </p>

                        <p className="text-4xl font-bold mt-6">$180</p>
                        <p className="text-gray-500 text-sm">Per visit (up to 3 bed / 2 bath)</p>

                        <button className="mt-6 border-2 border-orange-400 text-gray-700 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
                            Continue
                        </button>

                        <hr className="my-6" />

                        <p className="font-semibold mb-3">Includes everything in Standard, plus:</p>

                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Inside oven & fridge</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Inside cabinets</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Window interiors (up to 10)</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Detailed baseboard & molding</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Door frames & switches</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-md flex flex-col">
                        <p className="text-orange-500 font-semibold mb-1">Move in/move out</p>
                        <h3 className="text-2xl font-bold">New Beginnings</h3>

                        <p className="flex items-center gap-2 text-gray-700 mt-3">
                            <span className="text-green-500 text-xl">✔</span>
                            Landlords, tenants, real estate staging
                        </p>

                        <p className="text-4xl font-bold mt-6">$220+</p>
                        <p className="text-gray-500 text-sm">Quote required for larger homes</p>

                        <button className="mt-6 border-2 border-orange-400 text-gray-700 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
                            Continue
                        </button>

                        <hr className="my-6" />

                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Deep clean of entire property</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Inside all appliances & cabinets</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Interior windows</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Walls, trim, and doors</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✔</span>Garage sweep (if needed)</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
