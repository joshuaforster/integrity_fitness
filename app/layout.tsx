import Header from "./components/layout/Header"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Header />
        <body className="min-h-full flex flex-col">
          {children}
        </body>
    </html>
  );
}
