import { useState, useMemo } from "react";
import {
  Card,
  Col,
  Container,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { AttributesChart } from "./AttributesChart";
import { heritages, trainings } from "./db";
import { Fragment } from "react";

function CharacterSummary({ name, heritage, training }) {
  if (!name) return null;
  let text = `You are ${name}. `;
  if (heritage) {
    text += `You are a member of the ${heritages[heritage].title}. `;
  }
  if (training) {
    text += `You are trained in the ways of the ${trainings[training].title}. `;
  }

  return (
    <Card>
      <Text>{text}</Text>
    </Card>
  );
}

function getBody({ heritage, training }) {
  return 1 + (heritages[heritage]?.body ?? 0) + (trainings[training]?.body ?? 0);
}

function getMind({ heritage, training }) {
  return 1 + (heritages[heritage]?.mind ?? 0) + (trainings[training]?.mind ?? 0);
}

function getSoul({ heritage, training }) {
  return 1 + (heritages[heritage]?.soul ?? 0) + (trainings[training]?.soul ?? 0);
}

function getHealth({ heritage, training }) {
  return (
    4 + (heritages[heritage]?.health ?? 0) + (trainings[training]?.health ?? 0)
  );
}

function getPower({ heritage, training }) {
  return (
    4 + (heritages[heritage]?.power ?? 0) + (trainings[training]?.power ?? 0)
  );
}

export function CreateCharacter() {
  const [name, setName] = useState("");
  const [heritage, setHeritage] = useState("");
  const [training, setTraining] = useState("");
  const body = useMemo(
    () => getBody({ heritage, training }),
    [heritage, training]
  );
  const mind = useMemo(
    () => getMind({ heritage, training }),
    [heritage, training]
  );
  const soul = useMemo(
    () => getSoul({ heritage, training }),
    [heritage, training]
  );
  const health = useMemo(
    () => getHealth({ heritage, training }),
    [heritage, training]
  );
  const power = useMemo(
    () => getPower({ heritage, training }),
    [heritage, training]
  );
  const features = [
    ...(heritages[heritage]?.features ?? []),
    ...(trainings[training]?.features ?? []),
  ];

  return (
    <Container css={{ height: "100%" }}>
      <Row css={{ height: "100%" }}>
        <Col css={{ padding: "$5", overflow: "auto", height: "100%" }}>
          <Row>
            <Col>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="xl"
                clearable
                label="Character Name"
                placeholder="Indiana Jones"
              />
            </Col>
            <Col>
              <CharacterSummary {...{ name, heritage, training }} />
            </Col>
          </Row>
          <Spacer y={1} />
          <Text h2>Heritage</Text>
          <Radio.Group
            value={heritage}
            onChange={setHeritage}
            row
            css={{ display: "grid", gap: "$5", gridTemplateColumns: "1fr 1fr" }}
          >
            {Object.entries(heritages).map(([id, { title, description }]) => (
              <Radio key={id} size="xl" value={id}>
                {title}
                <Radio.Description>{description}</Radio.Description>
              </Radio>
            ))}
          </Radio.Group>
          <Spacer y={1} />
          <Text h2>Training</Text>
          <Radio.Group
            value={training}
            onChange={setTraining}
            row
            css={{ display: "grid", gap: "$5", gridTemplateColumns: "1fr 1fr" }}
          >
            {Object.entries(trainings).map(([id, { title, description }]) => (
              <Radio key={id} size="xl" value={id}>
                {title}
                <Radio.Description>{description}</Radio.Description>
              </Radio>
            ))}
          </Radio.Group>
        </Col>
        <Col css={{ overflow: "auto", height: "100%" }}>
          <AttributesChart {...{ mind, body, soul, health, power }} />
          {features.map((feature) => (
            <Fragment key={feature.title}>
              <Card color="primary">
                <Text h3>{feature.title}</Text>
                {feature.description.split("\n").map((line, i) => (
                  <Text key={i}>{line}</Text>
                ))}
              </Card>
              <Spacer y={0.5} />
            </Fragment>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
