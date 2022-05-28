import styled from "styled-components";
import { Text } from "@nextui-org/react";

import { AttributesChart, NPCAttributesChart } from "./AttributesChart";
import { StatMeter } from "./StatMeter";
import { useMediaQuery } from "./common";
import { orderBy } from "lodash";

export function AttributesPanel({ character, updateCharacter, npcs }) {
  const showChart = useMediaQuery("(min-width: 850px)");
  return (
    <>
      {showChart ? (
        npcs ? (
          <NPCAttributesChart {...character} />
        ) : (
          <AttributesChart {...character} />
        )
      ) : (
        <AttributesSpec {...character} npcs={npcs} />
      )}
      <CharacterMeters
        character={character}
        updateCharacter={updateCharacter}
        npcs={npcs}
      />
    </>
  );
}

function CharacterMeters({ character, updateCharacter, npcs }) {
  if (npcs) {
    return (
      <StatMeter
        label="Capacity"
        character={character}
        attribute="capacity"
        updateCharacter={updateCharacter}
      />
    );
  }

  return (
    <>
      <StatMeter
        label="Health"
        character={character}
        attribute="health"
        updateCharacter={updateCharacter}
      />
      <StatMeter
        label="Power"
        character={character}
        attribute="power"
        updateCharacter={updateCharacter}
      />
    </>
  );
}

function AttributesSpec({ body, mind, soul, might, capacity, menace, npcs }) {
  const [min, mid, max] = orderBy(
    [
      { label: npcs ? "Might" : "Body", value: npcs ? might : body },
      { label: npcs ? "Capacity" : "Mind", value: npcs ? capacity : mind },
      { label: npcs ? "Menace" : "Soul", value: npcs ? menace : soul },
    ],
    "value"
  );

  return <AttributesSpecRow {...{ min, mid, max }} />;
}

function AttributesSpecRow({ min, mid, max }) {
  return (
    <Row>
      <div>
        <Text h3 color="primary">
          {mid.label}
        </Text>
        <Text h2>{mid.value}</Text>
      </div>

      <div>
        <Text h3 css={{ textGradient: "90deg, $primary 0%, $secondary 80%" }}>
          {max.label}
        </Text>
        <Text h2>{max.value}</Text>
      </div>

      <div>
        <Text h3 color="secondary">
          {min.label}
        </Text>
        <Text h2>{min.value}</Text>
      </div>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:nth-of-type(2) {
      transform: scale(120%);
      transform-origin: bottom center;
    }
  }
`;
