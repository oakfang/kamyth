import styled from "styled-components";
import { useState, useMemo } from "react";
import { Checkbox, Spacer } from "@nextui-org/react";
import { CharacterCreationFramework } from "./CharacterCreationFramework";
import { useNPCStats } from "../common";
import { npcLevels, npcTraits } from "../db";

export function CreateNPC() {
  const [isGroup, setIsGroup] = useState(false);
  const [level, setLevel] = useState("");
  const [traits, setTraits] = useState([]);
  const validator = ({ name }) => name && level;
  const { features: baseFeatures, ...attributes } = useNPCStats({
    isGroup,
    level,
    traits,
  });
  const [extraFeatures, _setFeatures] = useState([]);
  const setFeatures = (features) =>
    _setFeatures(features.filter((f) => !baseFeatures.includes(f)));
  const features = useMemo(() => {
    return Array.from(new Set([...baseFeatures, ...extraFeatures]));
  }, [baseFeatures, extraFeatures]);

  return (
    <NPCFramework
      validator={validator}
      npcs
      features={features}
      attributes={attributes}
      setFeatures={setFeatures}
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
      "  .        summary"
      "submit     summary";

    > section {
      max-height: var(--container-height);
    }
  }
`;
