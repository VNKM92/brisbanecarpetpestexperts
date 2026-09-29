'use client'
import { useState, useEffect } from 'react'
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
style={{ zIndex: i === current ? 10 : 1 }}
>
<img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
<div className="absolute inset-0 bg-black/60"></div>
</motion.div>
))}


<div className="absolute inset-0 flex items-center justify-center z-20 px-6 text-center">
<div className="max-w-3xl">
<motion.h1
initial={{ y: 20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.8 }}
className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight"