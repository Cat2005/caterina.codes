import { Pic, Row, Stack, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import type { PageSpec } from "@/components/canvas/types";

const uni: PageSpec = {
  back: "/",
  boards: [
    {
      id: "uni",
      m: { x: 10, y: 525, w: 600, h: 330 },
      tag: "Education",
      hero: true,
      x: 455,
      y: 436,
      w: 1075,
      h: 423,
      content: (
        <Row pad={50} gap={60}>
          <Pic src="/clay/acropolis.webp" alt="" width={220} />
          <Col gap={20}>
            <Title size={30}>BSc Computer Science and AI</Title>
            <Text size={22}>
              I studied at the University of Edinburgh where I obtained the highest overall mark for my
              programme of study.
            </Text>
            <Text size={22}>This is some stuff I got up to in my uni years.</Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "bicepcurl-post",
      m: { x: 40, y: 110, w: 235, h: 280 },
      tag: "Post",
      href: "/posts/bicepcurl-post",
      fit: true,
      post: true,
      x: 1273,
      y: 130,
      w: 335,
      h: 262,
      content: (
        <Stack pad={28} padBottom={16} gap={10}>
          <Pic src="/clay/dumbbell.webp" alt="" width={150} />
          <Title size={24}>Predicting muscular failure with ML</Title>
          <Text size={13}>Somehow I convinced CS students to do 3,200 bicep curls for science.</Text>
        </Stack>
      ),
    },
    {
      id: "dissertation",
      m: { x: 380, y: 100, w: 200, h: 200 },
      tag: "Dissertation",
      href: "/dissertation",
      x: 1620,
      y: 650,
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
      id: "compsoc",
      m: { x: 40, y: 930, w: 190, h: 190 },
      tag: "Web",
      href: "/compsoc",
      x: 190,
      y: 928,
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
      id: "make-mindmaps",
      m: { x: 350, y: 930, w: 235, h: 280 },
      tag: "Post",
      href: "/posts/make-mindmaps",
      fit: true,
      post: true,
      x: 789,
      y: 980,
      w: 335,
      h: 375,
      content: (
        <Stack pad={28} padBottom={16} gap={10} top>
          <Pic src="/posts/mindmap-card.webp" alt="" bleed />
          <Title size={22}>You should make mindmaps.</Title>
          <Text size={12}>All my notes are mindmaps and it&apos;s the best thing I ever did to speed up my learning.</Text>
        </Stack>
      ),
    },
  ],
};

export default uni;
