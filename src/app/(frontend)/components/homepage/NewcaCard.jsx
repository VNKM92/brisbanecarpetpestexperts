import IconTabs from "./IconTabs";

export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 fade-in">

      {/* LEFT IMAGE */}
      <div className="relative">
        <img
          src="/cleaner.png"
          alt="Outdoor Worker"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="p-10 flex flex-col justify-center">
        <IconTabs />

        <h1 className="text-4xl font-extrabold mb-4">
          Outdoor Cleaning
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Maintaining the cleanliness and appearance of your strata property 
          is essential. Our certified outdoor cleaning specialists help keep 
          your buildings safe, clean, and professional-looking at all times.
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition transform hover:scale-105 w-fit">
          Purchase Now →
        </button>
      </div>
    </section>
  );
}
