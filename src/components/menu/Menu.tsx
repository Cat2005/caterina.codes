import Link from "next/link";
import CursorButton from "./CursorButton";
import NdotIcon, { type IconName } from "./NdotIcon";
import s from "./Menu.module.css";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/posts", label: "Posts", icon: "posts" },
];

const social: { href: string; label: string; icon: IconName }[] = [
  { href: "https://github.com/Cat2005", label: "GitHub", icon: "github" },
  { href: "https://www.linkedin.com/in/caterina-m", label: "LinkedIn", icon: "linkedin" },
];

export default function Menu() {
  return (
    <aside className={s.menu}>
      <CursorButton />
      <p className={s.name}>Cat</p>
      <p className={s.sub}>Personal website</p>
      <hr className={s.divider} />
      <nav className={s.nav}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={s.link}>
            <NdotIcon name={l.icon} />
            {l.label}
          </Link>
        ))}
      </nav>
      <hr className={s.divider} />
      <nav className={s.nav}>
        {social.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className={s.link}
          >
            <NdotIcon name={l.icon} />
            {l.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
