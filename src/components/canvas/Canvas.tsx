import Board from "@/components/board/Board";
import BackArea from "./BackArea";
import BackLink from "./BackLink";
import PhysicsLayer from "./PhysicsLayer";
import { layoutBoards } from "./layout";
import { getPostImages } from "@/lib/posts";
import type { PageSpec } from "./types";
import s from "./Canvas.module.css";

export default function Canvas({ spec }: { spec: PageSpec }) {
  const placed = layoutBoards(spec);
  const hero = spec.boards.find((b) => b.hero);
  return (
    <main>
      <PhysicsLayer className={s.canvas}>
        {spec.back && <BackArea href={spec.back} />}
        {spec.back && hero && (
          <BackLink href={spec.back} {...placed.get(hero.id)!} />
        )}
        {spec.boards.map((b, i) => (
          <Board
            key={b.id}
            id={b.id}
            index={i}
            tag={b.tag}
            href={b.href}
            hero={b.hero}
            lead={b.intro || b.hero}
            plain={!b.intro && !b.hero && !b.post}
            post={b.post}
            fit={b.fit}
            preload={
              b.href?.startsWith("/posts/")
                ? getPostImages(b.href.slice(7))
                : undefined
            }
            {...placed.get(b.id)!}
          >
            {b.content}
          </Board>
        ))}
      </PhysicsLayer>
    </main>
  );
}
