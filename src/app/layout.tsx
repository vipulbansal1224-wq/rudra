import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/getContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rudraksh Enterprises",
  description: "Your trusted partner in innovation and excellence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const theme = content.theme || {
    primary: "#1e3a8a",
    secondary: "#facc15",
    headingText: "#111827",
    bodyText: "#4b5563",
    heroTitleSize: "60",
    heroSubtitleSize: "20",
    headingSize: "36",
    bodySize: "16",
  };

  return (
    <html lang="en">
      <body 
        className={`${inter.className} flex flex-col min-h-screen`}
        style={{
          '--theme-primary': theme.primary,
          '--theme-secondary': theme.secondary,
          '--theme-heading': theme.headingText,
          '--theme-text': theme.bodyText,
          '--hero-title-size': `${theme.heroTitleSize || "60"}px`,
          '--hero-subtitle-size': `${theme.heroSubtitleSize || "20"}px`,
          '--heading-size': `${theme.headingSize || "36"}px`,
          '--body-size': `${theme.bodySize || "16"}px`,
        } as React.CSSProperties}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
