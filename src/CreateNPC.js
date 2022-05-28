import styled from "styled-components";
import { useState, Fragment } from "react";
import {
  Radio,
  Checkbox,
  Spacer,
  Card,
  Button,
  Loading,
} from "@nextui-org/react";
import { NPCAttributesChart } from "./AttributesChart";
import { CharacterName } from "./CharacterName";
import { useNPCStats } from "./common";
import { npcLevels, npcTraits } from "./db";
import { FeatureCard } from "./FeatureCard";
import { useMutation } from "react-query";
import { useAppState } from "./state";
import { useNavigate } from "react-router-dom";

export function CreateNPC() {
  const [name, setName] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [level, setLevel] = useState("");
  const [traits, setTraits] = useState([]);
  const navigate = useNavigate();
  const { addCharacter } = useAppState();
  const { mutate, isLoading } = useMutation(
    (character) => {
      return addCharacter(character, "npcs");
    },
    {
      onSuccess: (character) => {
        navigate(`../${character.id}`);
      },
    }
  );
  const { might, menace, capacity, features } = useNPCStats({
    isGroup,
    level,
    traits,
  });
  const isValid = name && level;
  const onAdd = () => {
    if (!isValid) return;
    mutate({
      id: crypto.randomUUID(),
      name,
      level,
      traits,
      might,
      menace,
      capacity,
      features,
      current: {
        capacity,
      },
    });
  };

  return (
    <Grid>
      <CharacterName {...{ name, setName, isValid }} />
      <Level>
        <Radio.Group
          row
          css={{
            display: "grid",
            gap: "$5",
            gridTemplateColumns: "var(--radio-select-cols)",
          }}
          value={level}
          onChange={setLevel}
        >
          {Object.entries(npcLevels).map(([id, { title, description }]) => (
            <Radio key={id} value={id}>
              {title}
              <Radio.Description>{description}</Radio.Description>
            </Radio>
          ))}
        </Radio.Group>
        <Spacer y={1} />
        <Checkbox selected={isGroup} onChange={setIsGroup}>
          This is an NPC Group
        </Checkbox>
      </Level>
      <Summary>
        <NPCAttributesChart {...{ might, menace, capacity }} width="150%" />
        {features.map((feature) => (
          <Fragment key={feature}>
            <FeatureCard feature={feature} />
            <Spacer y={0.5} />
          </Fragment>
        ))}
      </Summary>
      <Traits>
        <Card bordered>
          <Checkbox.Group
            label="Select NPC Traits"
            color="secondary"
            value={traits}
            onChange={setTraits}
          >
            {Object.entries(npcTraits).map(([id, { title }]) => (
              <Checkbox key={id} value={id}>
                {title}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Card>
      </Traits>
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
  grid-template-columns: 1fr;
  --radio-select-cols: repeat(4, 1fr);

  grid-template-areas:
    "name"
    "level"
    "traits"
    "submit";

  @media (min-width: 700px) {
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name       summary"
      "level      summary"
      "traits     summary"
      "submit     summary";
  }

  @media (min-width: 1440px) {
  }
`;

const Level = styled.section`
  grid-area: level;
`;

const Summary = styled.section`
  grid-area: summary;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Traits = styled.section`
  grid-area: traits;

  [role="group"] {
    [role="presentation"] {
      flex-flow: row wrap;
      align-items: baseline;
      gap: 20px;
    }
  }
`;

const Submit = styled.section`
  grid-area: submit;
`;
