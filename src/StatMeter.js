import styled from "styled-components";
import { Col, Progress, Row, Spacer, Text, Button } from "@nextui-org/react";
import { useAppState } from "./state";

export function StatMeter({ label, character, attribute, updateCharacter }) {
  const { userId } = useAppState();
  const isEditable = userId === character.userId;
  const max = character[attribute];
  const current = character.current[attribute];
  const ratio = (current / max) * 100;
  let color = "success";
  if (ratio <= 50) color = "warning";
  if (ratio <= 25) color = "error";

  return (
    <Row>
      <Col>
        <Text h3>
          {label}
          <small>
            ({current} / {max})
          </small>
        </Text>
        <Spacer y={0.5} />
        <MeterRow gap={0.5} align="center">
          <Progress shadow color={color} value={ratio} />
          {isEditable ? (
            <Controllers
              {...{ character, attribute, max, current, updateCharacter }}
            />
          ) : null}
        </MeterRow>
      </Col>
    </Row>
  );
}

function Controllers({ character, attribute, max, current, updateCharacter }) {
  return (
    <div className="controls">
      <Button
        auto
        bordered
        color="error"
        onClick={() =>
          updateCharacter(
            character.id,
            `current.${attribute}`,
            Math.max(0, current - 1)
          )
        }
      >
        -1
      </Button>
      <Button
        auto
        bordered
        color="success"
        onClick={() =>
          updateCharacter(
            character.id,
            `current.${attribute}`,
            Math.min(max, current + 1)
          )
        }
      >
        +1
      </Button>
      <Button
        auto
        bordered
        color="gradient"
        onClick={() =>
          updateCharacter(character.id, `current.${attribute}`, max)
        }
      >
        ∞
      </Button>
    </div>
  );
}

const MeterRow = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;

  .controls {
    display: flex;
    gap: 5px;
    @media (max-width: 950px) {
      width: 100%;
      > * {
        flex: 1;
      }
    }
  }

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
