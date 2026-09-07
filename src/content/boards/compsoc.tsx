import { Media, Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import { TextLink } from "@/components/board/TitleLink";
import type { PageSpec } from "@/components/canvas/types";

const compsoc: PageSpec = {
  back: "/",
  boards: [
    {
      id: "compsoc",
      m: { x: 10, y: 480, w: 600, h: 420 },
      tag: "Web",
      hero: true,
      x: 455,
      y: 425,
      w: 1075,
      h: 380,
      content: (
        <Row pad={50} gap={45}>
          <Pic src="/clay/building.webp" alt="" width={200} />
          <Col gap={20}>
            <Title size={34} href="https://comp-soc.com">
              comp-soc.com
            </Title>
            <Text size={20}>
              The website for CompSoc, the University of Edinburgh&apos;s technology society. Co-developed
              and designed with <TextLink href="https://www.tomasmaillo.com">Tomas Maillo</TextLink>.
            </Text>
            <Text size={20}>
              We integrated features like pulling events straight from Google Calendar so the schedule
              stays up to date, and showing the live number of members online in Discord.
            </Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "compsoc-home",
      m: { x: 300, y: 990, w: 290, h: 190 },
      tag: "Home page",
      x: 1210,
      y: 950,
      w: 660,
      h: 433,
      content: <Media src="/projects/compsoc-home.mp4" poster="/projects/compsoc-home-poster.webp" pad={0} />,
    },
    {
      id: "compsoc-sponsors",
      m: { x: 40, y: 965, w: 240, h: 198 },
      tag: "Sponsors page",
      x: 140,
      y: 900,
      w: 440,
      h: 364,
      content: (
        <Media
          src="/projects/compsoc-sponsors.mp4"
          poster="/projects/compsoc-sponsors-poster.webp"
          pad={0}
        />
      ),
    },
    {
      id: "compsoc-role",
      m: { x: 40, y: 70, w: 250, h: 300 },
      tag: "My role",
      fit: true,
      post: true,
      x: 1530,
      y: 130,
      w: 370,
      h: 285,
      content: (
        <Stack pad={30} padBottom={22} gap={12}>
          <Pic src="/clay/laptop.webp" alt="" width={110} />
          <Title size={22}>Tech secretary &amp; sponsorship coordinator</Title>
          <Text size={14}>
            Alongside building this site, I ran the Infball event website and kept CompSoc&apos;s internal
            servers alive.
          </Text>
          <Text size={14}>
            I also raised £30k in sponsorship funding and signed on 8 companies, including Meta, Optiver
            and QRT.
          </Text>
        </Stack>
      ),
    },
  ],
};

export default compsoc;
