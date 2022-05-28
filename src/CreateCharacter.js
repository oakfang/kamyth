import styled from "styled-components";
import { Fragment, useState } from "react";
import { Radio, Spacer, Text, Button, Loading } from "@nextui-org/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AttributesChart } from "./AttributesChart";
import { heritages, trainings } from "./db";
import { useStats, useMediaQuery, useResizeObserver } from "./common";
import { useAppState } from "./state";
import { FeatureCard } from "./FeatureCard";
import { CharacterName } from "./CharacterName";

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
  const { mutate, isLoading } = useMutation(addCharacter, {
    onSuccess: (character) => {
      navigate(`../${character.id}`);
    },
  });
  const radioSizes = useMediaQuery("(min-width: 1460px)") ? "xl" : "md";
  const [ref, { height }] = useResizeObserver();
  const isValid = name && heritage && training;
  const onAdd = () => {
    if (!isValid) return;
    mutate({
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
  };

  return (
    <Grid
      ref={ref}
      style={{ "--container-height": height ? `${height}px` : "100%" }}
    >
      <CharacterName {...{ name, setName, isValid }} />
      <Heritage>
        <Text h2>Heritage</Text>
        <Radio.Group
          value={heritage}
          onChange={setHeritage}
          row
          css={{
            display: "grid",
            gap: "$5",
            gridTemplateColumns: "var(--radio-select-cols)",
          }}
        >
          {Object.entries(heritages).map(([id, { title, description }]) => (
            <Radio key={id} size={radioSizes} value={id}>
              {title}
              <Radio.Description>{description}</Radio.Description>
            </Radio>
          ))}
        </Radio.Group>
      </Heritage>
      <Training>
        <Text h2>Training</Text>
        <Radio.Group
          value={training}
          onChange={setTraining}
          row
          css={{
            display: "grid",
            gap: "$5",
            gridTemplateColumns: "var(--radio-select-cols)",
          }}
        >
          {Object.entries(trainings).map(([id, { title, description }]) => (
            <Radio key={id} size={radioSizes} value={id}>
              {title}
              <Radio.Description>{description}</Radio.Description>
            </Radio>
          ))}
        </Radio.Group>
      </Training>
      <Summary>
        <AttributesChart {...{ mind, body, soul, health, power }} />
        {features.map((feature) => (
          <Fragment key={feature}>
            <FeatureCard feature={feature} />
            <Spacer y={0.5} />
          </Fragment>
        ))}
      </Summary>
      {isValid ? (
        <Submit>
          <Button size="xl" color="gradient" onPress={onAdd}>
            {isLoading ? <Loading color="white" /> : `Create ${name}`}
          </Button>
        </Submit>
      ) : null}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 10px;
  height: 100%;
  width: 100%;
  grid-auto-rows: min-content;
  --radio-select-cols: 1fr;
  grid-template-columns: 1fr;

  grid-template-areas:
    "name"
    "heritage"
    "training"
    "summary"
    "submit";

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);

    grid-template-areas:
      "name         name"
      "heritage training"
      "summary   summary"
      "submit    submit";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "    name     name  summary  summary"
      "heritage training  summary  summary"
      "heritage training  summary  summary"
      "  submit   submit  summary  summary";

    > section {
      max-height: var(--container-height);
    }
  }

  @media (min-width: 1440px) {
    --radio-select-cols: 1fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "    name     name      name   summary  summary"
      "heritage heritage  heritage   summary  summary"
      "training training  training   summary  summary"
      "  submit   submit    submit   summary  summary";
  }
`;

const Heritage = styled.section`
  grid-area: heritage;
`;

const Training = styled.section`
  grid-area: training;
`;

const Summary = styled.section`
  grid-area: summary;
  overflow: auto;
`;

const Submit = styled.section`
  grid-area: submit;
`;
