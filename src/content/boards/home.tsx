import { Hero, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Pixel, Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const home: PageSpec = {
  boards: [
    {
      id: "intro",
      p: { x: 409, y: 810 },
      m: { x: 60, y: 548, w: 500, h: 285 },
      tag: "Intro",
      intro: true,
      x: 644,
      y: 549,
      w: 632,
      h: 276,
      content: (
        <Hero gap={18}>
          <Title size={60}>hi, i&apos;m Cat.</Title>
          <Pixel size={23}>i like making fun websites and i care a lot about design.</Pixel>
        </Hero>
      ),
    },
    {
      id: "makeupcherie",
      p: { x: 560, y: 465 },
      m: { x: 35, y: 95, w: 185, h: 185 },
      tag: "Web",
      href: "/makeupcherie",
      x: 541,
      y: 108,
      w: 587,
      h: 216,
      content: (
        <Row pad={40}>
          <Col gap={8}>
            <Title size={38}>makeupcherie.com</Title>
            <Pixel size={17}>10M+ views on Instagram/Tiktok/Reddit</Pixel>
          </Col>
          <Pic src="/clay/cherries.webp" alt="" width={125} />
        </Row>
      ),
    },
    {
      id: "uni",
      p: { x: 120, y: 1590 },
      m: { x: 395, y: 85, w: 185, h: 185 },
      tag: "Education",
      href: "/uni",
      x: 1323,
      y: 194,
      w: 587,
      h: 220,
      content: (
        <Row pad={24} gap={24}>
          <Pic src="/clay/acropolis.webp" alt="" width={190} />
          <Col gap={8}>
            <Title size={24}>BSc Computer Science and AI</Title>
            <Text size={14}>Ranked 1st in programme</Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "compsoc",
      p: { x: 1040, y: 140 },
      tag: "Web",
      href: "https://comp-soc.com",
      x: 1591,
      y: 545,
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
      id: "bicepcurl-post",
      p: { x: 40, y: 940, scale: 0.85 },
      m: { x: 38, y: 965, w: 180, h: 180 },
      tag: "ML",
      href: "/posts/bicepcurl-post",
      x: 133,
      y: 675,
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
    {
      id: "minki",
      p: { x: 520, y: 1240 },
      m: { x: 210, y: 342, w: 200, h: 167 },
      tag: "Web",
      href: "/minki",
      x: 631,
      y: 1041,
      w: 538,
      h: 220,
      content: (
        <Row pad={32}>
          <Col gap={10}>
            <Title size={36}>minki.cards</Title>
            <Pixel size={20}>My newest and most ambitious project!</Pixel>
          </Col>
          <Pic src="/projects/minki-card.webp" alt="" width={230} flush />
        </Row>
      ),
    },
    {
      id: "spotify",
      p: { x: 1130, y: 900 },
      m: { x: 405, y: 900, w: 175, h: 175 },
      tag: "Job",
      href: "/spotify",
      x: 1389,
      y: 933,
      w: 263,
      h: 250,
      content: (
        <Stack pad={24} gap={12} center>
          <Pic src="/clay/spotify.webp" alt="" width={150} />
          <Title size={23}>SWE @ Spotify</Title>
        </Stack>
      ),
    },
  ],
};

export default home;
