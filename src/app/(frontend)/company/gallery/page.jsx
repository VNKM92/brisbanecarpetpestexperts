import Gallery from "./components/Gallery";

export default function GalleryPage() {
  // Array of images stored in /public/gallery
  const images = Array.from({ length: 12 }).map((_, i) => `/assets/gallery/${i + 1}.jpg`);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/about/aboutus-slider.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Gallery
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
            </p>
          </div>
        </section>
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600 mt-5">Image Gallery</h1>
      <Gallery images={images} />
    </div>
  );
}
