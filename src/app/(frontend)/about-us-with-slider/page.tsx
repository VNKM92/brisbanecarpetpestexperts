'use client';

import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export default function AboutUsWithSlider() {
  return (
    <main className="w-full">
      {/* Hero Slider Section */}
      <section className="w-full">
        <FullWidthAdvancedSlider />
      </section>

      {/* About Content Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Our Company
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              With over a decade of experience, we've been transforming spaces and creating 
              cleaner, healthier environments for thousands of satisfied customers across the region.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                number: '500+',
                title: 'Happy Clients',
                description: 'Trusted by hundreds of satisfied customers',
                icon: '😊',
              },
              {
                number: '10+',
                title: 'Years Experience',
                description: 'A decade of excellence in cleaning services',
                icon: '🏆',
              },
              {
                number: '24/7',
                title: 'Available Service',
                description: 'Ready to assist you anytime, anywhere',
                icon: '⏰',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{item.number}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive cleaning solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Cleaning',
                description: 'Keep your home spotless with our professional residential cleaning services',
                features: ['Weekly/Fortnightly', 'End of lease', 'Spring cleaning'],
              },
              {
                title: 'Bond Cleaning',
                description: 'Get your full deposit back with our certified bond cleaning service',
                features: ['100% Guarantee', 'Detailed inspection', 'Quick turnaround'],
              },
              {
                title: 'Commercial Cleaning',
                description: 'Professional office and commercial space cleaning solutions',
                features: ['After-hours service', 'Eco-friendly', 'Customizable plans'],
              },
              {
                title: 'Deep Cleaning',
                description: 'Thorough deep cleaning for every corner of your property',
                features: ['Carpet cleaning', 'Window cleaning', 'Grout cleaning'],
              },
              {
                title: 'Move-In Cleaning',
                description: 'Professional move-in cleaning for a fresh start in your new space',
                features: ['Full property', 'Detailed service', 'Flexible timing'],
              },
              {
                title: 'Carpet Cleaning',
                description: 'Professional carpet and upholstery cleaning service',
                features: ['Steam cleaning', 'Stain removal', 'Deodorizing'],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400">
              Real feedback from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Homeowner',
                text: 'Excellent service! The team was professional, thorough, and left my home spotless. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Business Owner',
                text: 'Our office has never looked better. The attention to detail is remarkable. Great value for money.',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                role: 'Property Manager',
                text: 'Reliable, punctual, and thorough. They handle our properties with care. Great partnership!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full" />
                  <div>
                    <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-amber-500">
                        ⭐
                      </span>
                    ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Professional Cleaning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us today for a free quote and experience the difference professional cleaning can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105">
              Request Quote
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
