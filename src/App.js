import styled from "styled-components";
import { Container, Text } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";
import { StorageManager } from "./StorageManager";

export default function App() {
  return (
    <AppContainer>
      <Row>
        <Link to="/">
          <Text h1 css={{ width: "fit-content" }}>
            Character Keeper
          </Text>
        </Link>
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

const Row = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--nextui-colors-accents0);
  padding-inline: 20px;
`;
