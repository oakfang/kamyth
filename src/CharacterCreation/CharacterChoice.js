import styled from "styled-components";
import { Radio, Text } from "@nextui-org/react";

export function CharacterChoice({
  label,
  sectionName,
  options,
  value,
  setValue,
  radioSizes = "md",
  children,
}) {
  return (
    <GridSection $sectionName={sectionName}>
      {label && <Text h2>{label}</Text>}
      <Radio.Group
        value={value}
        onChange={setValue}
        row
        css={{
          display: "grid",
          gap: "$5",
          gridTemplateColumns: "var(--radio-select-cols)",
        }}
      >
        {Object.entries(options).map(([id, { title, description }]) => (
          <Radio key={id} size={radioSizes} value={id}>
            {title}
            <Radio.Description>{description}</Radio.Description>
          </Radio>
        ))}
      </Radio.Group>
      {children}
    </GridSection>
  );
}

const GridSection = styled.section`
  grid-area: ${(props) => props.$sectionName};
`;
