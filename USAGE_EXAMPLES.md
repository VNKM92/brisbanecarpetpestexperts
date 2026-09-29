# 🎬 Full Width Slider - Usage Examples

## Example 1: Basic Homepage Implementation

### File: `src/app/(frontend)/page.tsx`

```tsx
'use client';

import FullWidthAdvancedSlider from './components/FullWidthAdvancedSlider';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Slider */}
      <FullWidthAdvancedSlider />

      {/* About Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">About Us</h2>
          <p className="text-xl text-gray-400">
            We provide professional cleaning services for residential and commercial properties.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">Our Services</h2>
          {/* Services grid here */}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
```

---

## Example 2: About Page with Slider

### File: `src/app/(frontend)/about-us/page.tsx`

```tsx
'use client';

import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export default function AboutUs() {
  return (
    <main className="w-full">
      {/* Hero Slider */}
      <FullWidthAdvancedSlider />

      {/* About Content */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-8">
            About Our Company
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            With over 10 years of experience, we've been transforming spaces 
            and creating cleaner, healthier environments for thousands of satisfied customers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 bg-slate-800 rounded-lg">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <p className="text-gray-400">Happy Clients</p>
            </div>
            <div className="p-8 bg-slate-800 rounded-lg">
              <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div className="p-8 bg-slate-800 rounded-lg">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <p className="text-gray-400">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Example 3: Using Swiper Version for Mobile

### File: `src/app/(frontend)/services/page.tsx`

```tsx
'use client';

import SwiperFullWidthSlider from '../components/SwiperFullWidthSlider';

export default function Services() {
  return (
    <main className="w-full">
      {/* Hero with Swiper (Better touch support) */}
      <SwiperFullWidthSlider />

      {/* Services Grid */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Cleaning',
                description: 'Professional home cleaning services',
              },
              {
                title: 'Bond Cleaning',
                description: 'Guaranteed deposit return cleaning',
              },
              {
                title: 'Commercial Cleaning',
                description: 'Office and business space cleaning',
              },
              {
                title: 'Deep Cleaning',
                description: 'Thorough deep cleaning services',
              },
              {
                title: 'Carpet Cleaning',
                description: 'Professional carpet care',
              },
              {
                title: 'Window Cleaning',
                description: 'Spotless window cleaning',
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Example 4: Multiple Sliders on One Page

### File: `src/app/(frontend)/portfolio/page.tsx`

```tsx
'use client';

import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';
import OptimizedFullWidthSlider from '../components/OptimizedFullWidthSlider';

export default function Portfolio() {
  return (
    <main className="w-full">
      {/* Slider 1: Before & After Showcase */}
      <section>
        <h2 className="absolute top-8 left-8 text-white text-2xl font-bold z-40">
          Before & After
        </h2>
        <FullWidthAdvancedSlider />
      </section>

      {/* Slider 2: Project Gallery */}
      <section className="mt-20">
        <h2 className="text-4xl font-bold text-white mb-8 px-4">
          Our Recent Projects
        </h2>
        <OptimizedFullWidthSlider />
      </section>

      {/* Other content */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">
            Client Testimonials
          </h2>
          {/* Testimonials here */}
        </div>
      </section>
    </main>
  );
}
```

---

## Example 5: With Dynamic Content

### File: `src/app/(frontend)/blog/page.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import OptimizedFullWidthSlider from '../components/OptimizedFullWidthSlider';

export default function Blog() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    // Fetch featured blog posts
    const posts = [
      {
        id: 1,
        title: 'Spring Cleaning Tips',
        image: '/assets/blog/spring-cleaning.jpg',
      },
      {
        id: 2,
        title: 'Deep Cleaning Guide',
        image: '/assets/blog/deep-cleaning.jpg',
      },
      {
        id: 3,
        title: 'Eco-Friendly Products',
        image: '/assets/blog/eco-friendly.jpg',
      },
    ];
    setFeaturedPosts(posts);
  }, []);

  return (
    <main className="w-full">
      {/* Featured Posts Slider */}
      <OptimizedFullWidthSlider />

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {post.title}
                  </h3>
                  <button className="mt-4 text-blue-400 hover:text-blue-300">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Example 6: With Dark Mode Toggle

### File: `src/app/(frontend)/gallery/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export default function Gallery() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className={`w-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header with Dark Mode Toggle */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Slider */}
      <FullWidthAdvancedSlider />

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            Project Gallery
          </h2>
          <p className="text-lg mb-8">
            Explore our portfolio of completed projects and transformations.
          </p>
        </div>
      </section>
    </main>
  );
}
```

---

## Example 7: With Custom Slides Data

### File: `src/app/(frontend)/custom-page/page.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

// Create a wrapper component to customize slides
const CustomSliderPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Custom slides data
  const customSlides = [
    {
      id: 1,
      title: 'Kitchen Deep Cleaning',
      subtitle: 'Sparkling Clean',
      description: 'Professional deep cleaning for your kitchen',
      image: '/assets/home/image/kitchen.jpg',
      bgColor: 'from-amber-900/70 to-slate-800/70',
      accent: 'amber',
    },
    {
      id: 2,
      title: 'Bathroom Excellence',
      subtitle: 'Hygiene First',
      description: 'Thorough bathroom cleaning and sanitization',
      image: '/assets/home/image/bathroom.jpg',
      bgColor: 'from-emerald-900/70 to-slate-800/70',
      accent: 'emerald',
    },
    {
      id: 3,
      title: 'Living Room Refresh',
      subtitle: 'Fresh & Clean',
      description: 'Complete living space cleaning',
      image: '/assets/home/image/living.jpg',
      bgColor: 'from-blue-900/70 to-slate-800/70',
      accent: 'blue',
    },
  ];

  return (
    <main className="w-full">
      {/* Slider */}
      <FullWidthAdvancedSlider />

      {/* Info Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">
            Our Specializations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customSlides.map((slide) => (
              <div
                key={slide.id}
                className="p-8 bg-slate-800 rounded-lg text-white"
              >
                <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                <p className="text-gray-400">{slide.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomSliderPage;
```

---

## Example 8: Minimal Setup (Copy-Paste Ready)

### File: `src/app/(frontend)/quick-start/page.tsx`

```tsx
'use client';

import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export default function QuickStart() {
  return (
    <>
      <FullWidthAdvancedSlider />
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Below Slider Content</h2>
          <p>Your content here...</p>
        </div>
      </section>
    </>
  );
}
```

---

## Example 9: With Metadata (SEO Ready)

### File: `src/app/(frontend)/seo-page/page.tsx`

```tsx
'use client';

import { Metadata } from 'next';
import FullWidthAdvancedSlider from '../components/FullWidthAdvancedSlider';

export const metadata: Metadata = {
  title: 'Professional Cleaning Services | Quality Care',
  description: 'Premium cleaning solutions for homes and businesses. Expert team, eco-friendly products.',
  keywords: 'cleaning, professional, services, eco-friendly',
  openGraph: {
    title: 'Professional Cleaning Services',
    description: 'Premium cleaning solutions',
    images: ['/assets/home/image/slider1.jpg'],
  },
};

export default function SEOPage() {
  return (
    <main>
      <FullWidthAdvancedSlider />
      
      <article className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Professional Cleaning Services
        </h1>
        <p className="text-lg text-gray-400">
          Discover our premium cleaning solutions designed to transform your space.
        </p>
      </article>
    </main>
  );
}
```

---

## Example 10: Performance Optimized Version

### File: `src/app/(frontend)/performance/page.tsx`

```tsx
'use client';

import dynamic from 'next/dynamic';

// Lazy load slider
const OptimizedSlider = dynamic(
  () => import('../components/OptimizedFullWidthSlider'),
  {
    loading: () => (
      <div className="w-full h-screen bg-gradient-to-b from-slate-900 to-black" />
    ),
    ssr: false,
  }
);

export default function PerformancePage() {
  return (
    <main className="w-full">
      <OptimizedSlider />

      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white">
            High Performance Page
          </h2>
          <p className="text-gray-400 mt-4">
            This page uses lazy loading for optimal performance.
          </p>
        </div>
      </section>
    </main>
  );
}
```

---

## Quick Copy-Paste Templates

### Minimal Template
```tsx
'use client';
import FullWidthAdvancedSlider from './components/FullWidthAdvancedSlider';
export default function Page() {
  return <FullWidthAdvancedSlider />;
}
```

### With Section Template
```tsx
'use client';
import FullWidthAdvancedSlider from './components/FullWidthAdvancedSlider';
export default function Page() {
  return (
    <>
      <FullWidthAdvancedSlider />
      <section className="py-20 px-4 bg-black text-white">
        <h2 className="text-4xl font-bold">Content Here</h2>
      </section>
    </>
  );
}
```

### With Navigation Template
```tsx
'use client';
import FullWidthAdvancedSlider from './components/FullWidthAdvancedSlider';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
export default function Page() {
  return (
    <>
      <Navigation />
      <FullWidthAdvancedSlider />
      <Footer />
    </>
  );
}
```

---

**Ready to Use!** Pick an example above that matches your needs and start building. 🚀
