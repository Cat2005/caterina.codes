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
      m: { x: 40, y: 110, w: 200, h: 200 },
      tag: "Post",
      href: "/posts/makeup-post",
      fit: true,
      x: 1450,
      y: 170,
      w: 400,
      h: 335,
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
      id: "makeupcherie-site",
      m: { x: 380, y: 100, w: 200, h: 200 },
      tag: "Web",
      href: "https://makeupcherie.com",
      x: 120,
      y: 860,
      w: 360,
      h: 330,
      content: <Media src="/posts/makeupcherie-main.mp4" pad={20} caption="makeupcherie.com" />,
    },
    {
      id: "nailpolish",
      m: { x: 200, y: 960, w: 230, h: 190 },
      tag: "Web",
      href: "https://nailpolishfinder.com",
      x: 1000,
      y: 880,
      w: 420,
      h: 330,
      content: <Media src="/posts/nailpolish-cut.mp4" pad={20} caption="nailpolishfinder.com" />,
    },
  ],
};

export default makeupcherie;
