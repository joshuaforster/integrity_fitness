import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/layout/HeaderBlack";
import Footer from "./components/layout/Footer";
import ScrollReveal from "./components/layout/ScrollReveal";
import SiteProgressBar from "./components/ui/CourseProgressBar";
import CookieBanner from "./components/layout/CookieBanner";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const OG_IMAGE = {
  url: "https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev/TGG%20HALL%20ROAD/GYM-FLOOR-EXPLANATION-IFE-TGGNHR_003.jpg",
  width: 1200,
  height: 630,
  alt: "Integrity Fitness Education — personal trainer courses in Norwich",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.integrityfitness.education"),
  title: {
    default: "Integrity Fitness Education | Personal Training Courses Norwich",
    template: "%s | Integrity Fitness Education",
  },
  description:
    "Integrity Fitness Education offers professional personal trainer courses and fitness qualifications in Norwich, Norfolk. Start your fitness career today.",
  openGraph: {
    siteName: "Integrity Fitness Education",
    locale: "en_GB",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#CE1A19",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="preconnect" href="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#CE1A19] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <CartProvider>
          <SiteProgressBar />
          <Header />
          <ScrollReveal />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
