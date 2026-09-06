import s from "./Menu.module.css";

const glyphs = {
  home: ["....#....", "...###...", "..#####..", ".#######.", "..#...#..", "..#.#.#..", "..#####.."],
  projects: [".#######.", ".#.....#.", ".#.....#.", ".#.....#.", ".#######.", "....#....", "..#####.."],
  posts: [".#####...", ".#....#..", ".#.....#.", ".#.###.#.", ".#.....#.", ".#.###.#.", ".#######."],
  github: [".........", "..#...#..", ".#.....#.", "#.......#", ".#.....#.", "..#...#..", "........."],
  linkedin: ["..#......", ".........", "..#..###.", "..#..#.#.", "..#..#.#.", "..#..#.#.", "..#..#.#."],
};

export type IconName = keyof typeof glyphs;

export default function NdotIcon({ name }: { name: IconName }) {
  const rows = glyphs[name];
  return (
    <svg
      className={s.icon}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {rows.map((row, y) =>
        [...row].map((cell, x) =>
          cell === "#" ? <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.5} /> : null,
        ),
      )}
    </svg>
  );
}
