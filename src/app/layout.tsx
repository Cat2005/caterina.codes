import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { inter, ndot } from "@/fonts/fonts";
import Menu from "@/components/menu/Menu";
import CursorFollower from "@/components/menu/CursorFollower";
import NavTracker from "@/components/canvas/NavTracker";
import "./globals.css";

const title = "cat :)";
const description = "i like making fun websites and i care a lot about design.";

// Scrapers ignore a relative og:image, so this has to be absolute -- and it has to
// point at the deployment being shared, or a preview link advertises an image that
// only exists in production. Vercel supplies both hosts, so the canonical domain
// (apex vs www) never has to be hardcoded here.
const host =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_URL;

const site = process.env.NEXT_PUBLIC_SITE_URL ?? (host ? `https://${host}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: title, type: "website" },
  // Discord drops to an 80x80 thumbnail without this
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${ndot.variable} ${inter.variable}`}>
      <body>
        <NavTracker />
        <Menu />
        <CursorFollower />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  var d = document.documentElement;
  function set() {
    var w = d.clientWidth, h = d.clientHeight, m = w <= 560;
    var p = w <= h && !document.querySelector("[data-wide-scale]");
    var s = m
      ? Math.min(w / 620, h / 1380)
      : p
        ? Math.min(w / 1450, h / 1920)
        : Math.min(w / 2000, h / Math.max(1250, Math.min(1390, 1950 - 350 * (w / h))));
    s = Math.max(m ? 0.3 : 0.35, Math.min(m ? 1 : 1.5, s));
    d.style.setProperty("--scale", s);
    d.style.setProperty("--vwd", w / s + "px");
    d.style.setProperty("--vhd", h / s + "px");
  }
  set();
  addEventListener("resize", set);
  addEventListener("orientationchange", set);
})();`,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
