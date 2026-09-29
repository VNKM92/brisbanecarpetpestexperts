"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";


export default function RoundCercalCard() {


    
  const heroRef = useRef(null);
  const bigTextRef = useRef(null);

    const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      setNavSolid(window.scrollY > 20);
      // parallax
      if (bigTextRef.current) {
        const y = window.scrollY;
        const offset = Math.min(y * 0.2, 120);
        bigTextRef.current.style.transform = `translateY(${offset}px) scale(${1 - Math.min(y/2000,0.08)})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // intersection observer for hero elements (fade-in)
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[#fffdf8] antialiased"> 
      {/* Hero */}
        <main className="pt-30 h-screen flex items-center relative overflow-hidden">
            <div className="h-screen w-full py-20 relative flex md:flex-row flex-col gap-10 justify-center items-center bg-gray-100 dark:bg-white">
                {/* <!-- 1 --> */}
                <div className="w-full h-full flex justify-center items-center">
                    <div className="absolute animate-ping h-[16rem] w-[16rem] rounded-full  border-t-4 border-b-4 border-red-500 ">
                    </div>
                    <div className="absolute animate-spin h-[14rem] w-[14rem] rounded-full  border-t-4 border-b-4 border-purple-500 ">
                    </div>
                    <div className="absolute animate-ping h-[12rem] w-[12rem] rounded-full  border-t-4 border-b-4 border-pink-500 ">
                    </div>
                    <div className="absolute animate-spin h-[10rem] w-[10rem] rounded-full border-t-4 border-b-4 border-yellow-500">
                    </div>
                    <div className="absolute animate-ping h-[8rem] w-[8rem] rounded-full border-t-4 border-b-4 border-green-500"></div>
                    <div className="absolute animate-spin h-[6rem] w-[6rem] rounded-full border-t-4 border-b-4 border-blue-500"></div>
                    <div
                        className="rounded-full h-28 w-28 animate-bounce flex items-center justify-center text-gray-400 font-semibold text-xl dark:text-black">
                        Loading...</div>

                </div>

                {/* <!-- 2 --> */}
                <div className="w-full h-full flex justify-center items-center">
                    <div className="absolute animate-spin h-[16rem] w-[16rem] rounded-full  border-t-4 border-b-4 border-red-500 ">
                    </div>
                    <div className="absolute animate-spin h-[14rem] w-[14rem] rounded-full  border-t-4 border-b-4 border-purple-500 ">
                    </div>
                    <div className="absolute animate-spin h-[12rem] w-[12rem] rounded-full  border-t-4 border-b-4 border-pink-500 ">
                    </div>
                    <div className="absolute animate-spin h-[10rem] w-[10rem] rounded-full border-t-4 border-b-4 border-yellow-500">
                    </div>
                    <div className="absolute animate-spin h-[8rem] w-[8rem] rounded-full border-t-4 border-b-4 border-green-500"></div>
                    <div className="absolute animate-spin h-[6rem] w-[6rem] rounded-full border-t-4 border-b-4 border-blue-500"></div>
                    <div
                        className="rounded-full h-28 w-28 animate-bounce flex items-center justify-center text-gray-400 font-semibold text-xl dark:text-black">
                        Loading...</div>

                </div>

                {/* <!-- 3 --> */}
                <div className="w-full h-full flex justify-center items-center">
                    <div className="absolute animate-spin h-[16rem] w-[16rem] rounded-full  border-tr-4 border-b-4 border-red-500 ">
                    </div>
                    <div className="absolute animate-spin h-[14rem] w-[14rem] rounded-full  border-tl-4 border-b-4 border-purple-500 ">
                    </div>
                    <div className="absolute animate-spin h-[12rem] w-[12rem] rounded-full  border-tr-4 border-b-4 border-pink-500 ">
                    </div>
                    <div className="absolute animate-spin h-[10rem] w-[10rem] rounded-full border-tl-4 border-b-4 border-yellow-500">
                    </div>
                    <div className="absolute animate-spin h-[8rem] w-[8rem] rounded-full border-tr-4 border-b-4 border-green-500"></div>
                    <div className="absolute animate-spin h-[6rem] w-[6rem] rounded-full border-tl-4 border-b-4 border-blue-500"></div>
                    <div
                        className="rounded-full h-28 w-28 animate-bounce flex items-center justify-center text-gray-400 font-semibold text-xl dark:text-black">
                        Loading...</div>
                </div>
            </div>

            
     
             

        </main>

        {/* <!-- about us --> */} */
      <section className="bg-gray-100" id="aboutus">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                  <div className="max-w-lg">
                      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Us</h2>
                      <p className="mt-4 text-gray-600 text-lg">
                          Bappa flour mill provides our customers with the highest quality products and services. We offer a
                          wide variety of flours and spices to choose from, and we are always happy to help our customers find
                          the perfect products for their needs.
                          We are committed to providing our customers with the best possible experience. We offer competitive
                          prices, fast shipping, and excellent customer service. We are also happy to answer any questions
                          that our customers may have about our products or services.
                          If you are looking for a flour and spices service business that can provide you with the highest
                          quality products and services, then we are the company for you. We look forward to serving you!</p>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="furniture" className="max-w-full z-10 h-auto"  />

                      {/* <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md"> */}
                  </div>
              </div>
          </div>
      </section>




      {/* <!-- why us  --> */}
      <section className="text-gray-700 body-font mt-10">
          <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
              Why Us?
          </div>
          <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap text-center justify-center">
                  <div className="p-4 md:w-1/4 sm:w-1/2">
                      <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">

                            
                            <img src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp" alt="furniture" className="max-w-full z-10 h-auto"  />
                          </div>
                          <h2 className="title-font font-regular text-2xl text-gray-900">Latest Milling Machinery</h2>
                      </div>
                  </div>

                  <div className="p-4 md:w-1/4 sm:w-1/2">
                      <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                              {/* <img src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp" className="w-32 mb-3"> */}

                               <img src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp" className="w-32 mb-3"></img>
                          </div>
                          <h2 className="title-font font-regular text-2xl text-gray-900">Reasonable Rates</h2>
                      </div>
                  </div>

                  <div className="p-4 md:w-1/4 sm:w-1/2">
                      <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                              {/* <img src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp" className="w-32 mb-3"> */}
                              <img src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp" alt="furniture" className="max-w-full z-10 h-auto"  />

                          </div>
                          <h2 className="title-font font-regular text-2xl text-gray-900">Time Efficiency</h2>
                      </div>
                  </div>

                  <div className="p-4 md:w-1/4 sm:w-1/2">
                      <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                          <div className="flex justify-center">
                              {/* <img src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp" className="w-32 mb-3"> */}

                              <img src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp" alt="furniture" className="max-w-full z-10 h-auto"  />
                          </div>
                          <h2 className="title-font font-regular text-2xl text-gray-900">Expertise in Industry</h2>
                      </div>
                  </div>

              </div>
          </div>
      </section>
        {/* <!-- gallery --> */}
      <section className="text-gray-700 body-font" id="gallery">
          <div className="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
              Gallery
          </div>

          <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

              <div className="group relative">
                  <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Image 1"
            className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
              </div>

              <div className="group relative">
                  <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Image 1"
            className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
              </div>

              <div className="group relative">
                  <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Image 1"
            className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
              </div>
              <div className="group relative">
                  <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Image 1"
            className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
              </div>
              {/* <!-- Repeat this div for each image --> */}
          </div>

      </section>

        
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-20 lg:px-8">
                <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900" id="contactUs">Visit Our Location</h2>
                    <p className="mt-3 text-lg text-gray-500">Let us serve you the best</p>
                </div>
                <div className="mt-8 lg:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-bold text-gray-900">Contact</h3>
                                    <p className="mt-1 font-bold text-gray-600"><a href="tel:+123">Phone: +91
                                            123456789</a></p>
                                    <a className="flex m-1" href="tel:+919823331842">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="flex items-center justify-between h-10 w-30 rounded-md bg-indigo-500 text-white p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                                </svg>
                                                Call now
                                            </div>
                                        </div>

                                    </a>
                                </div>
                                <div className="px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                                    <p className="mt-1 text-gray-600">Sale galli, 60 foot road, Latur</p>
                                </div>
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                                    <p className="mt-1 text-gray-600">Monday - Sunday : 2pm - 9pm</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden order-none sm:order-first">
                             
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.791557375253!2d144.9631627153163!3d-37.8141071797512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0ee1a1d3%3A0x5045675218d6e30!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678888888888!5m2!1sen!2sau"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </div>
        </section>       
    </div>

    
  );
}
