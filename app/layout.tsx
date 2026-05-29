import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/layout/HeaderBlack";
import Footer from "./components/layout/Footer";
import ScrollReveal from "./components/layout/ScrollReveal";
import SiteProgressBar from "./components/ui/CourseProgressBar";
import CookieBanner from "./components/layout/CookieBanner";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="dns-prefetch" href="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteProgressBar />
        <Header />
        <ScrollReveal />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
