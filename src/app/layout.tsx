import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./(frontend)/globals.css";

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
  title: {
    default: "Brisbane Carpet & Pest Experts | Professional Cleaning Services Brisbane",
    template: "%s | Brisbane Carpet & Pest Experts",
  },
  description: "Professional cleaning services in Brisbane including bond cleaning, end-of-lease, carpet cleaning, pest control, and more. Experienced team, satisfaction guaranteed.",
  keywords: ["cleaning services", "bond cleaning", "Brisbane", "end-of-lease", "carpet cleaning", "pest control", "commercial cleaning"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Brisbane Carpet & Pest Experts",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brisbane Carpet & Pest Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@brisbanecarpet",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-white selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
