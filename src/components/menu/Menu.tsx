import CursorButton from "./CursorButton";
import MenuLink from "./MenuLink";
import { type IconName } from "./NdotIcon";
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
    <aside className={s.menu} data-obstacle="">
      <CursorButton />
      <p className={s.name}>Cat</p>
      <p className={s.sub}>Personal website</p>
      <hr className={s.divider} />
      <nav className={s.nav}>
        {links.map((l) => (
          <MenuLink key={l.href} {...l} />
        ))}
      </nav>
      <hr className={s.divider} />
      <nav className={s.nav}>
        {social.map((l) => (
          <MenuLink key={l.href} {...l} external />
        ))}
      </nav>
    </aside>
  );
}
