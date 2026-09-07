import { Media, Pic, Row, Col } from "@/components/board/layouts";
import { Text, Title } from "@/components/board/text";
import { TextLink } from "@/components/board/TitleLink";
import type { PageSpec } from "@/components/canvas/types";

const dissertation: PageSpec = {
  back: "/uni",
  boards: [
    {
      id: "dissertation",
      m: { x: 10, y: 470, w: 600, h: 430 },
      tag: "Dissertation",
      hero: true,
      x: 455,
      y: 436,
      w: 1075,
      h: 423,
      content: (
        <Row pad={50} gap={50}>
          <Pic src="/clay/brain.webp" alt="" width={220} />
          <Col gap={20}>
            <Title size={30} href="https://github.com/Cat2005/XAI-Brain-Diagnosis">
              Clinically Interpretable XAI for glioblastoma diagnosis
            </Title>
            <Text size={20}>
              For my dissertation, I built a model for brain tumor diagnosis designed to be clinically
              interpretable. It builds on prior work with{" "}
              <TextLink href="https://github.com/yewsiang/ConceptBottleneck">concept bottleneck models</TextLink>{" "}
              to integrate clinical concepts into the pipeline, which were defined in collaboration with
              clinicians.
            </Text>
            <Text size={20}>I achieved an outstanding classification for this work (84%).</Text>
          </Col>
        </Row>
      ),
    },
    {
      id: "dissertation-pipeline",
      m: { x: 60, y: 120, w: 340, h: 181 },
      tag: "Model Architecture",
      x: 1240,
      y: 940,
      w: 640,
      h: 364,
      content: (
        <Media
          src="/projects/diss-1.webp"
          alt="Axial, sagittal and coronal MRI views each predict clinical concepts with VGG-16, then an ensemble and decision tree give the diagnosis"
        />
      ),
    },
    {
      id: "dissertation-concepts",
      m: { x: 40, y: 1010, w: 250, h: 216 },
      tag: "Dataset Construction",
      x: 150,
      y: 900,
      w: 420,
      h: 370,
      content: (
        <Media
          src="/projects/diss-3.webp"
          alt="Clinicians annotate keywords in radiology reports, which are aggregated into concepts and turned into concept vectors"
        />
      ),
    },
    {
      id: "dissertation-views",
      m: { x: 300, y: 1000, w: 240, h: 148 },
      tag: "MRI views",
      x: 1500,
      y: 130,
      w: 380,
      h: 252,
      content: <Media src="/projects/diss-2.webp" alt="3D brain volume sliced into axial, coronal and sagittal 2D scans" />,
    },
  ],
};

export default dissertation;
