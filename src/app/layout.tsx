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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  var d = document.documentElement;
  function set() {
    var w = d.clientWidth, h = d.clientHeight, m = w <= 560;
    var s = Math.min(w / (m ? 620 : 2000), h / (m ? 1380 : 1390));
    s = Math.max(m ? 0.3 : 0.35, Math.min(1, s));
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
        <NavTracker />
        <Menu />
        <CursorFollower />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
