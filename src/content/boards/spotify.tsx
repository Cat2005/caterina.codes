import { Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const spotify: PageSpec = {
  back: "/",
  boards: [
    {
      id: "spotify",
      m: { x: 10, y: 495, w: 600, h: 390 },
      tag: "Job",
      hero: true,
      x: 455,
      y: 436,
      w: 1076,
      h: 420,
      content: (
        <Row pad={52} gap={20}>
          <Pic src="/clay/spotify.webp" alt="" width={300} />
          <Col gap={20}>
            <Title size={30}>SWE @ Spotify</Title>
            <Text size={22}>
              I work in Premium Desirability, where I build features to increase Spotify Premium adoption.
            </Text>
            <Text size={22}>
              In the past I&apos;ve worked on web, now I&apos;m backend-focused (providing backend for
              iOS/Android app).
            </Text>
            <Text size={22}>These are some of the surfaces I&apos;ve worked on.</Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "spotify-authors",
      m: { x: 40, y: 100, w: 200, h: 158 },
      tag: "Full-stack",
      x: 1564,
      y: 120,
      w: 346,
      h: 273,
      content: (
        <Stack pad={36} gap={20} center>
          <Pic src="/projects/spotify-authors.webp" alt="" width={268} />
          <Title size={24}>Spotify for Authors</Title>
        </Stack>
      ),
    },
    {
      id: "spotify-jam",
      m: { x: 380, y: 95, w: 200, h: 200 },
      tag: "Backend",
      x: 1560,
      y: 850,
      w: 287,
      h: 350,
      content: (
        <Stack pad={32} gap={24} center>
          <Pic src="/projects/spotify-jam.webp" alt="" width={222} />
          <Title size={24}>Spotify Jam</Title>
        </Stack>
      ),
    },
    {
      id: "spotify-managed",
      m: { x: 40, y: 1000, w: 230, h: 190 },
      tag: "Backend",
      x: 138,
      y: 968,
      w: 403,
      h: 333,
      content: (
        <Stack pad={32} gap={24} center>
          <Pic src="/projects/spotify-managed.webp" alt="" width={337} />
          <Title size={24}>Gen Alpha Managed Accounts</Title>
        </Stack>
      ),
    },
    {
      id: "spotify-import",
      m: { x: 340, y: 1040, w: 230, h: 190 },
      tag: "Backend",
      x: 760,
      y: 960,
      w: 400,
      h: 330,
      content: (
        <Stack pad={32} gap={24} center>
          <Pic src="/projects/spotify-import.webp" alt="" width={337} />
          <Title size={24}>Your Library Import</Title>
        </Stack>
      ),
    },
  ],
};

export default spotify;
