// FILE: components/SliderHero.jsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'


const slides = [
'/images/slider1.jpg',
'/images/slider2.jpg',
'/images/slider3.jpg',
]


export default function SliderHero() {
const [current, setCurrent] = useState(0)
const [isPaused, setIsPaused] = useState(false)


useEffect(() => {
if (isPaused) return
const id = setInterval(() => {
setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1))
}, 5000)
return () => clearInterval(id)
}, [isPaused])

return (
<section
className="w-full h-screen md:h-[95vh] relative overflow-hidden"
onMouseEnter={() => setIsPaused(true)}
onMouseLeave={() => setIsPaused(false)}
>
{slides.map((src, i) => (
<motion.div
key={i}
initial={{ opacity: 0 }}
animate={{ opacity: i === current ? 1 : 0 }}
transition={{ duration: 0.9 }}
className="absolute inset-0 w-full h-full"
>
<Image
src={src}
alt={`slide-${i}`}
fill
className="w-full h-full object-cover"
/>
</motion.div>
))}
</section>
)
}