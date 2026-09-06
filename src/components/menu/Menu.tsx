import Link from "next/link";
import CursorButton from "./CursorButton";
import NdotIcon, { type IconName } from "./NdotIcon";
import s from "./Menu.module.css";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/posts", label: "Posts", icon: "posts" },
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
    </aside>
  );
}
