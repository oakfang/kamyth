import styled from "styled-components";
import { Text } from "@nextui-org/react";

import { AttributesChart } from "./AttributesChart";
import { StatMeter } from "./StatMeter";
import { useMediaQuery } from "./common";
import { orderBy } from "lodash";

function AttributesSpec({ body, mind, soul }) {
  const [min, mid, max] = orderBy(
    [
      { label: "Body", value: body },
      { label: "Mind", value: mind },
      { label: "Soul", value: soul },
    ],
    "value"
  );

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

export function AttributesPanel({ character, updateCharacter }) {
  const showChart = useMediaQuery("(min-width: 850px)");
  return (
    <>
      {showChart ? (
        <AttributesChart {...character} />
      ) : (
        <AttributesSpec {...character} />
      )}
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
