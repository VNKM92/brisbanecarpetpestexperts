import FAQSection from "./components/FAQSection";
import faqData from "./data/faq.json";

export default function FAQPage() {
  return (

    <> 
      {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-index-image4-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Faqs
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
            </p>
          </div>
        </section>
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-16">
      

      {/* Title */}
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-green-600 font-medium">Commonly Asked Questions</p>
        <h1 className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
          What Are You Trying to Find?
        </h1>
      </div>

      {/* FAQ Section */}
      <FAQSection categories={faqData.categories} />

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center mt-16 text-gray-600 dark:text-gray-400">
        Custom plans for maintaining a clean and healthy environment.{" "}
        <a href="#" className="text-green-600 font-semibold hover:underline">
          Request A Free Quote →
        </a>
      </div>

    </div>
    </>
  );
}
