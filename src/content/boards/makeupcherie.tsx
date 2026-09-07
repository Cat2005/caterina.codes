import { Media, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const makeupcherie: PageSpec = {
  back: "/",
  boards: [
    {
      id: "makeupcherie",
      m: { x: 10, y: 522, w: 600, h: 335 },
      tag: "Web",
      hero: true,
      x: 455,
      y: 436,
      w: 900,
      h: 340,
      content: (
        <Row pad={48}>
          <Col gap={26}>
            <Title size={38} href="https://makeupcherie.com">
              makeupcherie.com
            </Title>
            <Text size={22}>
              Website to find the closest nail polish and lip shades. Took off quickly after I posted
              about it on Reddit and Instagram where it got 10 million+ views. I received a lot of
              valuable feedback which I used to improve it, and learnt a lot about marketing+SEO!
            </Text>
          </Col>
          <Pic src="/clay/cherries.webp" alt="" width={170} />
        </Row>
      ),
    },
    {
      id: "makeup-post",
      m: { x: 45, y: 100, w: 235, h: 280 },
      tag: "Post",
      href: "/posts/makeup-post",
      fit: true,
      post: true,
      x: 1420,
      y: 820,
      w: 460,
      h: 385,
      content: (
        <Stack pad={28} padBottom={16} gap={10} top>
          <Pic src="/posts/lip-instagram-comments.webp" alt="" bleed />
          <Title size={24}>Extracting colors for 10K+ lip shades</Title>
          <Text size={13}>
            30,000 people asked me for a lip shade matcher so I did it. But extracting accurate colors is
            harder than it looks!
          </Text>
        </Stack>
      ),
    },
    {
      id: "makeupcherie-reel",
      m: { x: 340, y: 95, w: 150, h: 269 },
      tag: "Viral reel",
      href: "https://www.instagram.com/reels/DEiFRHeA5j-/",
      x: 110,
      y: 700,
      w: 240,
      h: 431,
      content: <Media src="/posts/makeupcherie-ig-cover.webp" pad={0} />,
    },
    {
      id: "makeupcherie-site",
      m: { x: 330, y: 940, w: 270, h: 128 },
      tag: "Home page",
      x: 620,
      y: 950,
      w: 600,
      h: 285,
      content: <Media src="/posts/makeupcherie-main.mp4" pad={0} />,
    },
    {
      id: "makeupcherie-results",
      m: { x: 40, y: 1000, w: 250, h: 169 },
      tag: "Match results",
      x: 1430,
      y: 170,
      w: 507,
      h: 343,
      content: <Media src="/posts/makeupcherie-lip-results.mp4" pad={0} />,
    },
  ],
};

export default makeupcherie;
