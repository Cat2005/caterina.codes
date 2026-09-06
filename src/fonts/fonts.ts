import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const ndot = localFont({
  src: "./ndot-47.woff2",
  variable: "--font-ndot",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
