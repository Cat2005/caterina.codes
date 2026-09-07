import { Hero, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Pixel, Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const projects: PageSpec = {
  boards: [
    {
      id: "projects-intro",
      m: { x: 60, y: 530, w: 500, h: 320 },
      tag: "Projects",
      intro: true,
      x: 644,
      y: 535,
      w: 632,
      h: 310,
      content: (
        <Hero gap={18}>
          <Title size={60}>projects</Title>
          <Pixel size={23}>
            I build mostly web, with some ML from uni. I like making things that are fun, creative, and a
            bit unnecessary.
          </Pixel>
        </Hero>
      ),
    },
    {
      id: "minki",
      m: { x: 35, y: 95, w: 200, h: 167 },
      tag: "Web",
      href: "/minki",
      x: 690,
      y: 1030,
      w: 590,
      h: 245,
      content: (
        <Row pad={36}>
          <Col gap={12}>
            <Title size={40}>minki.cards</Title>
            <Pixel size={21}>My newest and most ambitious project!</Pixel>
          </Col>
          <Pic src="/projects/minki-card.webp" alt="" width={255} flush />
        </Row>
      ),
    },
    {
      id: "makeupcherie",
      m: { x: 395, y: 85, w: 185, h: 185 },
      tag: "Web",
      href: "/makeupcherie",
      x: 700,
      y: 140,
      w: 587,
      h: 216,
      content: (
        <Row pad={40}>
          <Col gap={8}>
            <Title size={38}>makeupcherie.com</Title>
            <Pixel size={17}>10M+ views on Instagram/Tiktok/Reddit</Pixel>
          </Col>
          <Pic src="/clay/cherries.webp" alt="" width={150} />
        </Row>
      ),
    },
    {
      id: "compsoc",
      m: { x: 225, y: 320, w: 165, h: 165 },
      tag: "Web",
      href: "https://comp-soc.com",
      x: 1460,
      y: 330,
      w: 254,
      h: 242,
      content: (
        <Stack pad={20} gap={10} center>
          <Pic src="/clay/building.webp" alt="" width={130} />
          <Title size={24}>comp-soc.com</Title>
        </Stack>
      ),
    },
    {
      id: "dissertation",
      m: { x: 40, y: 920, w: 180, h: 180 },
      tag: "Dissertation",
      href: "https://github.com/Cat2005/XAI-Brain-Diagnosis",
      x: 1500,
      y: 760,
      w: 287,
      h: 350,
      content: (
        <Stack pad={24} gap={10}>
          <Pic src="/clay/brain.webp" alt="" width={160} center />
          <Title size={20}>Clinically Interpretable XAI for glioblastoma diagnosis</Title>
          <Text size={12}>I achieved an outstanding classification for this work (84%).</Text>
        </Stack>
      ),
    },
    {
      id: "bicepcurl-post",
      m: { x: 380, y: 1000, w: 180, h: 180 },
      tag: "ML",
      href: "/posts/bicepcurl-post",
      x: 150,
      y: 820,
      w: 335,
      h: 262,
      content: (
        <Stack pad={28} gap={10}>
          <Pic src="/clay/dumbbell.webp" alt="" width={150} />
          <Title size={24}>Predicting muscular failure with ML</Title>
          <Text size={13}>Somehow I convinced CS students to do 3,200 bicep curls for science.</Text>
        </Stack>
      ),
    },
  ],
};

export default projects;
