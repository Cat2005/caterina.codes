import Link from "next/link";
import CursorButton from "./CursorButton";
import s from "./Menu.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/posts", label: "Posts" },
];

export default function Menu() {
  return (
    <aside className={s.menu}>
      <CursorButton />
      <p className={s.name}>Cat</p>
      <p className={s.sub}>Personal website</p>
      <nav className={s.nav}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={s.link}>
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
