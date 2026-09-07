import { Media, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const minki: PageSpec = {
  back: "/",
  boards: [
    {
      id: "minki",
      m: { x: 10, y: 490, w: 600, h: 400 },
      tag: "Web",
      hero: true,
      x: 455,
      y: 410,
      w: 1075,
      h: 450,
      content: (
        <Row pad={50} gap={30}>
          <Col gap={26}>
            <Title size={54} href="https://minki.cards">
              minki.cards
            </Title>
            <Col gap={14}>
              <Text size={22}>
                Minki is a web-based collaborative card builder. This is my newest and most ambitious
                project!
              </Text>
              <Text size={22}>
                Almost every component was custom designed by me so this was a big design effort as well
                as a technical one. Some of my favourite components and flows are spotlighted here!
              </Text>
            </Col>
          </Col>
          <Pic src="/projects/minki-card.webp" alt="" width={320} />
        </Row>
      ),
    },
    {
      id: "minki-main-flow",
      m: { x: 40, y: 990, w: 250, h: 180 },
      tag: "Main flow",
      x: 700,
      y: 970,
      w: 474,
      h: 345,
      content: <Media src="/projects/minki-main-flow.mp4" poster="/projects/minki-main-flow-poster.webp" />,
    },
    {
      id: "minki-design-post",
      m: { x: 340, y: 1030, w: 240, h: 180 },
      tag: "Post",
      fit: true,
      x: 1500,
      y: 940,
      w: 380,
      h: 295,
      content: (
        <Stack pad={34} padBottom={14} gap={8}>
          <Pic src="/clay/laptop.webp" alt="" width={162} />
          <Title size={24}>Finding design inspiration for Minki</Title>
          <Text size={13}>
            30,000 people asked me for a lip shade matcher so I did it. But extracting accurate colors is
            harder than it looks!
          </Text>
        </Stack>
      ),
    },
    {
      id: "minki-disc",
      m: { x: 65, y: 100, w: 185, h: 185 },
      tag: "Disc annotation",
      x: 1660,
      y: 200,
      w: 255,
      h: 270,
      content: <Media src="/projects/minki-disc.mp4" poster="/projects/minki-disc-poster.webp" pad={20} />,
    },
    {
      id: "minki-send",
      m: { x: 345, y: 150, w: 255, h: 172 },
      tag: "Send flow",
      x: 90,
      y: 940,
      w: 410,
      h: 245,
      content: <Media src="/projects/minki-send.mp4" poster="/projects/minki-send-poster.webp" pad={0} />,
    },
  ],
};

export default minki;
