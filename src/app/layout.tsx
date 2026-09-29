import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Brisbane - Professional Cleaning Services Brisbane",
    template: "%s | Brisbane",
  },
  description: "Professional cleaning services in Brisbane including bond cleaning, end-of-lease, pest control, and more. Experienced team, satisfaction guaranteed.",
  keywords: ["cleaning services", "bond cleaning", "Brisbane", "end-of-lease", "professional cleaning"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Brisbane",
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
    creator: "@Brisbane",
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
  return children;
}
