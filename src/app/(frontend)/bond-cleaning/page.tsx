export const metadata = {
    title: "Qleen | Professional Home Cleaning Services",
    description: "Experience premium home cleaning with Qleen — where cleanliness meets comfort.",
    keywords: ["cleaning", "home service", "qleen", "eco cleaning", "professional cleaners"],
    openGraph: {
        title: "Qleen - Home Cleaning Experts",
        description: "Reliable, eco-friendly home cleaning services.",
        url: "https://qleen.com/bond-cleaning",
        siteName: "Qleen",
        images: [
            {
                url: "/chair.png",
                width: 1200,
                height: 630,
                alt: "Qleen - professional cleaning",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Qleen | Bond Cleaning",
        description: "Professional bond and end-of-lease cleaning services to help you get your bond back.",
        images: ["/chair.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

import BondCleaningClient from './BondCleaningClient';

export default function BondCleaningPage() {
    return <BondCleaningClient />;
}



