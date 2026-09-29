import { Inter, Roboto_Mono } from "next/font/google";
import ".././globals.css";
import Navigation from '.././components/Navigation';
import Footer from ".././components/Footer";
// import Image from "next/image"; 

// import Hero from '../components/Hero';



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "What Our Clients Think | Satisfaction Survey",
  description:
    "Read what our clients think about our services. Rated 4.7 stars on Google with 200+ happy customers. Check our satisfaction survey results for punctuality, quality, and respect.",
  openGraph: {
    title: "What Our Clients Think | Satisfaction Survey",
    description:
      "4.7★ rated service trusted by 200+ clients. Explore our satisfaction survey — punctuality, quality, and respect for your home.",
    url: "https://yourdomain.com",
    siteName: "Your Company",
    images: [
      {
        url: "/survey-preview.png",
        width: 1200,
        height: 630,
        alt: "Client Satisfaction Survey",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Our Clients Think",
    description: "See our satisfaction survey and what clients say about us.",
    images: ["/survey-preview.png"],
  },
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} bg-[#fffdf8] dark:bg-gray-900 font-sans transition-colors duration-300`}>
          {/* <Navigation  /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

