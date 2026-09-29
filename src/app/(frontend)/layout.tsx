import Navigation from './components/Navigation';
import Footer from "./components/Footer";
import JsonLd from "@/components/JsonLd";
import { generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/seo-schema";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdf8]">
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
