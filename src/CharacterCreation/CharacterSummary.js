import styled from "styled-components";
import { Fragment } from "react";
import { Spacer } from "@nextui-org/react";
import { AttributesChart, NPCAttributesChart } from "../AttributesChart";
import { FeatureCard } from "../FeatureCard";

export function CharacterSummary({ attributes, npcs, features }) {
  const Chart = npcs ? NPCAttributesChart : AttributesChart;

  return (
    <Summary>
      <Chart {...attributes} />
      {features.map((feature) => (
        <Fragment key={feature}>
          <FeatureCard feature={feature} />
          <Spacer y={0.5} />
        </Fragment>
      ))}
    </Summary>
  );
}

const Summary = styled.section`
  grid-area: summary;
  overflow: auto;
`;
