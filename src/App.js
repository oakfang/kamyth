import styled from "styled-components";
import { Container, Row, Text } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";
import { StorageManager } from "./StorageManager";

export default function App() {
  return (
    <AppContainer>
      <Row justify="space-between" css={{ background: "$accents0" }}>
        <Container fluid css={{ flex: 1 }}>
          <Link to="/">
            <Text h1>Character Keeper</Text>
          </Link>
        </Container>
        <StorageManager />
      </Row>
      <Container css={{ overflow: "auto" }}>
        <Outlet />
      </Container>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
