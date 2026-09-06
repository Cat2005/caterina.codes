import { Media, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const minki: PageSpec = {
  back: "/",
  boards: [
    {
      id: "minki",
      tag: "Web",
      hero: true,
      x: 455,
      y: 436,
      w: 940,
      h: 390,
      content: (
        <Row pad={50} gap={30}>
          <Col gap={14}>
            <Title size={54}>minki.cards</Title>
            <Text size={18}>Web-based collaborative card builder. This is my newest and most ambitious project!</Text>
            <Text size={18}>
              Almost every component was custom designed by me so this was a big design effort as well as a
              technical one. Some of my favourite components and flows are spotlighted here!
            </Text>
            <Text size={18}>Built with Next, Convex DB, BetterAuth, Resend, Vercel</Text>
          </Col>
          <Pic src="/projects/minki-card.webp" alt="" width={320} />
        </Row>
      ),
    },
    {
      id: "minki-main-flow",
      tag: "Main flow",
      x: 1445,
      y: 640,
      w: 474,
      h: 345,
      content: <Media src="/projects/minki-main-flow.mp4" poster="/projects/minki-main-flow-poster.webp" />,
    },
    {
      id: "minki-design-post",
      tag: "Post",
      fit: true,
      x: 1470,
      y: 90,
      w: 445,
      h: 345,
      content: (
        <Stack pad={40} padBottom={16} gap={10}>
          <Pic src="/clay/laptop.webp" alt="" width={190} />
          <Title size={28}>Finding design inspiration for Minki</Title>
          <Text size={15}>
            30,000 people asked me for a lip shade matcher so I did it. But extracting accurate colors is
            harder than it looks!
          </Text>
        </Stack>
      ),
    },
    {
      id: "minki-disc",
      tag: "Disc annotation",
      x: 88,
      y: 563,
      w: 255,
      h: 270,
      content: <Media src="/projects/minki-disc.mp4" poster="/projects/minki-disc-poster.webp" pad={20} />,
    },
    {
      id: "minki-send",
      tag: "Send flow",
      x: 1000,
      y: 1020,
      w: 410,
      h: 245,
      content: <Media src="/projects/minki-send.mp4" poster="/projects/minki-send-poster.webp" pad={0} />,
    },
    {
      id: "minki-editor",
      tag: "Editor",
      x: 186,
      y: 950,
      w: 550,
      h: 335,
      content: <Media src="/projects/minki-editor.mp4" poster="/projects/minki-editor-poster.webp" />,
    },
  ],
};

export default minki;
