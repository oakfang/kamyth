import styled from "styled-components";
import { Container, Loading, Text } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";
import { useAppState } from "./state";

export default function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { username, logout } = useAppState();

  const loading = isFetching || isMutating;

  return (
    <AppContainer>
      <Row>
        <Link to="/">
          <Text h1 css={{ width: "fit-content" }}>
            Character Keeper
          </Text>
        </Link>
        <div>
          {loading ? <Loading color="secondary" /> : null}
          <Text h4 onClick={logout}>
            {username}
          </Text>
        </div>
      </Row>
      <Container css={{ overflow: "auto", flex: 1 }}>
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
  align-items: center;

  > div {
    display: flex;
    gap: 5px;
  }
`;
