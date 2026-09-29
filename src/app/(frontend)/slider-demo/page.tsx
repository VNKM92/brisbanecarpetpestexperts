'use client';

import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export default function SliderDemo() {
  return (
    <main className="w-full">
      {/* Full Width Slider */}
      <FullWidthAdvancedSlider />

      {/* Additional Content Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience premium cleaning services with cutting-edge technology and dedicated professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Team',
                description: 'Certified and trained professionals ready to serve you',
                icon: '👥',
              },
              {
                title: 'Advanced Equipment',
                description: 'State-of-the-art cleaning technology and tools',
                icon: '⚙️',
              },
              {
                title: 'Eco-Friendly',
                description: 'Sustainable and safe cleaning solutions',
                icon: '🌿',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
