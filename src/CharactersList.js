import { Button, Card, Container, Row, Text, Spacer } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "./state";

function EmptyState() {
  const navigate = useNavigate();
  return (
    <>
      <Card bordered>
        <Text h6>No characters... yet.</Text>
      </Card>
      <Spacer y={0.5} />
      <Row justify="center">
        <Button size="xl" color="gradient" onPress={() => navigate("new")}>
          Create First Character
        </Button>
      </Row>
    </>
  );
}

export function CharacterList() {
  const { characters } = useAppState();

  return (
    <Container xs>
      <Spacer y={1} />
      {characters.length === 0 ? <EmptyState /> : null}
    </Container>
  );
}
