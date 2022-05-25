import generate from "japanese-name-generator";
import { Fragment, useState } from "react";
import {
  Card,
  Col,
  Container,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AttributesChart } from "./AttributesChart";
import { heritages, trainings } from "./db";
import { useStats } from "./common";
import { useAppState } from "./state";

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

export function CreateCharacter() {
  const { addCharacter } = useAppState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [heritage, setHeritage] = useState("");
  const [training, setTraining] = useState("");
  const { body, mind, soul, health, power, features } = useStats({
    heritage,
    training,
  });
  const isValid = name && heritage && training;
  const onAdd = () => {
    if (!isValid) return;
    addCharacter({
      id: crypto.randomUUID(),
      name,
      heritage,
      training,
      body,
      mind,
      soul,
      health,
      power,
      features,
      current: {
        health,
        power,
      },
    });
    navigate("..");
  };

  return (
    <Container css={{ height: "100%" }}>
      <Row css={{ height: "100%" }}>
        <Col css={{ padding: "$5", overflow: "auto", height: "100%" }}>
          <Row align="flex-end">
            <Input
              color={name ? (isValid ? "success" : "primary") : "warning"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="xl"
              clearable
              label="Character Name"
              placeholder="Indiana Jones"
            />
            <Button.Group color="secondary">
              <Button
                onClick={() => setName(generate({ gender: "male" }).name)}
              >
                Random ♂
              </Button>
              <Button
                onClick={() => setName(generate({ gender: "female" }).name)}
              >
                Random ♀
              </Button>
            </Button.Group>
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
          <Spacer y={1} />
          {isValid ? (
            <Button size="xl" color="gradient" onPress={onAdd}>
              Create {name}
            </Button>
          ) : null}
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
