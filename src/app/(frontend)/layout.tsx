import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation';
import Footer from "./components/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Brisbanecarpet - Professional Cleaning Services Brisbane",
  description: "Professional cleaning services in Brisbane including bond cleaning, end-of-lease, pest control, and more. Experienced team, satisfaction guaranteed.",
  keywords: ["cleaning services", "bond cleaning", "Brisbane", "end-of-lease", "professional cleaning"],
  openGraph: {
    title: "Brisbane - Professional Cleaning Services Brisbane",
    description: "Professional cleaning services in Brisbane including bond cleaning, end-of-lease, pest control, and more.",
    type: "website",
    url: "http://localhost:3000",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brisbane Professional Cleaning Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brisbane - Professional Cleaning Services Brisbane",
    description: "Professional cleaning services in Brisbane",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.variable} ${robotoMono.variable} bg-red-500 dark:bg-black font-sans  transition-colors duration-300 `}>
          <Navigation  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
