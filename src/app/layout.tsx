import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rudraksh Enterprises - Audio-Visual, Furniture, IT & CCTV Solutions",
  description: "We provide complete integration of Audio-Visual Systems, Institutional Furniture, IT Infrastructure, and CCTV Surveillance in Panchkula, Haryana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
