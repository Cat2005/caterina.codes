import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const avantGarde = localFont({
  src: '../../public/fonts/Avant-Garde-Medium.ttf', // Adjust path as needed
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
        {children}
      </body>
    </html>
  );
}
