
"use client";
import { useEffect, useState } from 'react';
// import '../styles/globals.css';

 

function ServiceSlider({ Component, pageProps }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    
    const handleMouseMove = (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const hoverElements = document.querySelectorAll('.cursor-hover');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className={`cursor ${isHovered ? 'cursor-active' : ''}`} />
      <Component {...pageProps} />
    </>
  );
}

export default ServiceSlider;
