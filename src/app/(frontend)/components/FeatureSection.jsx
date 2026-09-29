import FeatureCard from './FeatureCard';

import { FaHandsHelping, FaBrush, FaClipboardCheck, FaSearch } from 'react-icons/fa'

export default function FeatureSection() {
  return (
    <section className="px-6 py-16 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-10">The Most Reliable Name in Cleaning Business</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <FeatureCard
            icon={<FaHandsHelping size={40} />}
            title="Safe Teams and Social Distancing"
            description="Our cleaning teams follow strict social distancing guidelines, ensuring both staff safety and a hygienic environment for residents."
          />
          <FeatureCard
            icon={<FaBrush size={40} />}
            title="High-Quality Disinfectants"
            description="We use only professional-grade disinfectants to thoroughly eliminate harmful bacteria and viruses, ensuring a safer, cleaner facility for residents."
          />
          <FeatureCard
            icon={<FaClipboardCheck size={40} />}
            title="Sanitized & Cleaned Equipment"
            description="Our cleaning tools are sterilized and disinfected after each use, maintaining the highest standards of cleanliness and preventing cross-contamination."
          />
          <FeatureCard
            icon={<FaSearch size={40} />}
            title="Guaranteed Complete Satisfaction"
            description="We offer a 100% satisfaction guarantee on our cleaning services, ensuring that your facility meets the highest standards of cleanliness and hygiene."
          />
        </div>
      </div>
    </section>
  )
}
