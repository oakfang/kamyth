import { Card, Container, Spacer, Text } from "@nextui-org/react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthLock } from "./Auth";
import { useAppState } from "./state";

export function AppIndex() {
  const navigate = useNavigate();
  useAuthLock();
  const { isGM } = useAppState();

  if (!isGM) {
    return <Navigate to="/characters" replace={true} />;
  }

  return (
    <Container>
      <Card
        bordered
        clickable
        color="primary"
        onClick={() => navigate("/characters")}
      >
        <Text h1>My Characters</Text>
      </Card>
      <Spacer y={1} />
      <Card
        bordered
        clickable
        color="secondary"
        onClick={() => navigate("/pcs")}
      >
        <Text h1>My PCs</Text>
      </Card>
      <Spacer y={1} />
      <Card bordered clickable color="error" onClick={() => navigate("/npcs")}>
        <Text h1>My NPCs</Text>
      </Card>
    </Container>
  );
}
