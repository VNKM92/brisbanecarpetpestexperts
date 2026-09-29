"use client";
import { motion } from "framer-motion";
import Image from 'next/image';
// import HeroImage from '/sofa.png';  

const cards = [
  {
    title: "Furniture Cleaning",
    desc: "We restore your furniture to its best condition.",
    img: "/images/sofa-clean.jpg",
    width:"400", height: "250"
  },
  {
    title: "Carpet Cleaning",
    desc: "Deep cleaning to remove dust and stains effectively.",
    img: "/images/home-clean.jpg",
    width:"400", height: "250"
  },
  {
    title: "Office Cleaning",
    desc: "Maintain a spotless work environment.",
    img: "/images/office-clean.jpg",
    width:"400", height: "250"
  },
];

export default function AnimatedCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center text-green-700">
        Our Cleaning Services
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
          >
            {card.img && (
              <Image
                src={card.img}
                alt={card.title}
                width={card.width}
                height={card.height}
                priority={false}
                // placeholder="blur"
                // blurDataURL={HeroImage}
                // layout="responsive"
                className="mx-auto mb-4 w-32 h-32 object-contain rounded-full"
                
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
