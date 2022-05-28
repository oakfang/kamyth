import styled from "styled-components";
import { useState } from "react";
import { Checkbox, Spacer } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { CharacterCreationFramework } from "./CharacterCreationFramework";
import { useNPCStats, useResizeObserver } from "../common";
import { npcLevels, npcTraits } from "../db";
import { useAppState } from "../state";
import { CharacterName } from "./CharacterName";
import { CharacterChoice } from "./CharacterChoice";
import { CharacterSummary } from "./CharacterSummary";
import { SubmitCharacter } from "./SubmitCharacter";
import { CharacterMultiChoice } from "./CharacterMultiChoice";

export function CreateNPC() {
  const [isGroup, setIsGroup] = useState(false);
  const [level, setLevel] = useState("");
  const [traits, setTraits] = useState([]);
  const validator = ({ name }) => name && level;
  const navigate = useNavigate();
  const { addCharacter } = useAppState();
  const [ref, { height }] = useResizeObserver();
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
  const { features, ...attributes } = useNPCStats({
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
    <NPCFramework
      validator={validator}
      npcs
      features={features}
      attributes={attributes}
      character={{
        level,
        traits,
        isGroup,
        current: {
          capacity: attributes.capacity,
        },
      }}
      choices={[
        {
          sectionName: "level",
          options: npcLevels,
          value: level,
          setValue: setLevel,
          children: (
            <>
              <Spacer y={1} />
              <Checkbox selected={isGroup} onChange={setIsGroup}>
                This is an NPC Group
              </Checkbox>
            </>
          ),
        },
        {
          multi: true,
          sectionName: "traits",
          label: "Select NPC Traits",
          options: npcTraits,
          value: traits,
          setValue: setTraits,
        },
      ]}
    />
  );
}

const NPCFramework = styled(CharacterCreationFramework)`
  grid-template-areas:
    "name"
    "level"
    "traits"
    "summary"
    "submit";

  @media (max-width: 700px) {
    --radio-select-cols: repeat(1, 1fr);

    figure {
      width: 60%;
      margin-inline: auto;
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name       summary"
      "level      summary"
      "traits     summary"
      "submit     summary";

    > section {
      max-height: var(--container-height);
    }
  }
`;
