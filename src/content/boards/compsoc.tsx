import { Media, Pic, Row, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import { TextLink } from "@/components/board/TitleLink";
import type { PageSpec } from "@/components/canvas/types";

const compsoc: PageSpec = {
  back: "/",
  boards: [
    {
      id: "compsoc",
      m: { x: 10, y: 400, w: 600, h: 500 },
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
            <Text size={20}>
              Alongside building this site, I raised £30k in sponsorship funding for CompSoc.
            </Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "compsoc-home",
      m: { x: 340, y: 980, w: 245, h: 161 },
      tag: "Home page",
      x: 1330,
      y: 880,
      w: 530,
      h: 348,
      content: <Media src="/projects/compsoc-home.mp4" poster="/projects/compsoc-home-poster.webp" pad={0} />,
    },
    {
      id: "compsoc-sigs",
      m: { x: 430, y: 40, w: 115, h: 250 },
      tag: "SIGs on mobile",
      x: 1660,
      y: 120,
      w: 220,
      h: 478,
      content: <Media src="/projects/compsoc-sigs.mp4" poster="/projects/compsoc-sigs-poster.webp" pad={0} />,
    },
    {
      id: "compsoc-sponsors",
      m: { x: 40, y: 970, w: 240, h: 198 },
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
  ],
};

export default compsoc;
