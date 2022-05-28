import styled from "styled-components";
import { Card, Checkbox } from "@nextui-org/react";

export function CharacterMultiChoice({
  label,
  sectionName,
  options,
  value,
  setValue,
}) {
  return (
    <GridSection $sectionName={sectionName}>
      <Card bordered>
        <Checkbox.Group
          label={label}
          color="secondary"
          value={value}
          onChange={setValue}
        >
          {Object.entries(options).map(([id, { title }]) => (
            <Checkbox key={id} value={id}>
              {title}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Card>
    </GridSection>
  );
}

const GridSection = styled.section`
  grid-area: ${(props) => props.$sectionName};

  [role="group"] {
    [role="presentation"] {
      flex-flow: row wrap;
      align-items: baseline;
      gap: 20px;
    }
  }
`;
