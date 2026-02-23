import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import AuroraBackground from "./components/AuroraBackground";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const avantGarde = localFont({
  src: '../../public/fonts/Avant-Garde-Medium.ttf',
  variable: '--font-avant-garde',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Caterina Mammola",
  description: "Caterina Mammola's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${avantGarde.variable} antialiased`}>
        <AuroraBackground />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
