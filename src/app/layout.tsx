import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { inter, ndot } from "@/fonts/fonts";
import Menu from "@/components/menu/Menu";
import CursorFollower from "@/components/menu/CursorFollower";
import NavTracker from "@/components/canvas/NavTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cat",
  description: "i like making fun websites and i care a lot about design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ndot.variable} ${inter.variable}`}>
      <body>
        <NavTracker />
        <Menu />
        <CursorFollower />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
