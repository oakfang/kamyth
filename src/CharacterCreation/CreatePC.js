import styled from "styled-components";
import { useState } from "react";
import { heritages, trainings } from "../db";
import { useStats } from "../common";
import { CharacterCreationFramework } from "./CharacterCreationFramework";

export function CreatePC() {
  const [heritage, setHeritage] = useState("");
  const [training, setTraining] = useState("");
  const { features, ...attributes } = useStats({
    heritage,
    training,
  });
  const validator = ({ name }) => name && heritage && training;

  return (
    <PCFramework
      {...{ validator, attributes, features }}
      character={{
        heritage,
        training,
        current: {
          health: attributes.health,
          power: attributes.power,
        },
      }}
      choices={[
        {
          sectionName: "heritage",
          label: "Heritage",
          options: heritages,
          value: heritage,
          setValue: setHeritage,
        },
        {
          sectionName: "training",
          label: "Training",
          options: trainings,
          value: training,
          setValue: setTraining,
        },
      ]}
    />
  );
}

const PCFramework = styled(CharacterCreationFramework)`
  --radio-select-cols: 1fr;

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
      "     .        .         .     summary  summary"
      "  submit   submit    submit   summary  summary";
  }
`;
