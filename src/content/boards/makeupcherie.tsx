import { Media, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Pixel, Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const makeupcherie: PageSpec = {
  back: "/",
  boards: [
    {
      id: "makeupcherie",
      tag: "Web",
      hero: true,
      x: 455,
      y: 436,
      w: 900,
      h: 340,
      content: (
        <Row pad={48}>
          <Col gap={14}>
            <Title size={38} href="https://makeupcherie.com">
              makeupcherie.com
            </Title>
            <Pixel size={17}>10M+ views on Instagram/Tiktok/Reddit</Pixel>
            <Text size={15}>
              A lip shade matcher and nail polish finder. Pick a colour, get the closest products.
            </Text>
          </Col>
          <Pic src="/clay/cherries.webp" alt="" width={170} />
        </Row>
      ),
    },
    {
      id: "makeup-post",
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
