import { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Home Cleaning",
      description: "From $49",
      image: "/path-to-your-image1.png", // Replace with your image path
    },
    {
      title: "Office Cleaning",
      description: "From $39",
      image: "/path-to-your-image2.png", // Replace with your image path
    },
    {
      title: "Short-Term Rentals Cleaning",
      description: "From $59",
      image: "/path-to-your-image3.png", // Replace with your image path
    },
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
       
       
    </div>
  );
};

export default Carousel;
