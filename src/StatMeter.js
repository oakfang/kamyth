import { Col, Progress, Row, Spacer, Text, Button } from "@nextui-org/react";

export function StatMeter({ label, character, attribute, updateCharacter }) {
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
          {label} <small>({current})</small>
        </Text>
        <Spacer y={0.5} />
        <Row gap={0.5} align="center">
          <Col span="8">
            <Progress color={color} value={ratio} />
          </Col>
          <Col span="4">
            <Row gap={0.25}>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
