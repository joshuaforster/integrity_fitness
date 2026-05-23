import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/layout/HeaderBlack";
import Footer from "./components/layout/Footer";
import ScrollReveal from "./components/layout/ScrollReveal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Integrity Fitness Education | Personal Training Courses Norwich",
  description:
    "Integrity Fitness Education offers professional personal trainer courses and fitness qualifications in Norwich, Norfolk. Start your fitness career today.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <ScrollReveal />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
