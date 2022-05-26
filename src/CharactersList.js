import styled from "styled-components";
import {
  Button,
  Card,
  Container,
  Row,
  Text,
  Spacer,
  Col,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { AttributesChart } from "./AttributesChart";
import { heritages, trainings } from "./db";
import { useAppState } from "./state";
import { ImportCharacterModel, useMediaQuery } from "./common";

function CreateCharacterButton({ children }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { addCharacter } = useAppState();
  return (
    <Row fluid justify="space-between" wrap="wrap">
      <Button size="xl" color="gradient" onPress={() => navigate("new")}>
        {children}
      </Button>
      <Button size="xl" bordered color="gradient" onPress={() => setShow(true)}>
        Import Character
      </Button>
      <ImportCharacterModel
        show={show}
        close={() => setShow(false)}
        onImport={addCharacter}
      />
    </Row>
  );
}

function EmptyState() {
  return (
    <>
      <Card bordered>
        <Text h6>No characters... yet.</Text>
      </Card>
      <Spacer y={0.5} />
      <CreateCharacterButton>Create First Character</CreateCharacterButton>
    </>
  );
}

export function CharacterList() {
  const { characters } = useAppState();
  const navigate = useNavigate();
  const showCharts = useMediaQuery("(min-width: 750px)");

  if (!characters) {
    return null;
  }

  return (
    <Container xs>
      <Spacer y={1} />
      {characters.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <CreateCharacterButton>Create a New Character</CreateCharacterButton>
          <Spacer y={1} />
          {characters.map((c) => (
            <Fragment key={c.id}>
              <Card clickable bordered onClick={() => navigate(c.id)}>
                <CharacterCardRow>
                  <div>
                    <Text h2>{c.name}</Text>
                    <Text h3>
                      A
                      {trainings[c.training].title.match(/^(aeuih)/i)
                        ? "n"
                        : ""}{" "}
                      {trainings[c.training].title} of the{" "}
                      {heritages[c.heritage].title}
                    </Text>
                  </div>
                  {showCharts && (
                    <AttributesChart width="200px" labels={false} {...c} />
                  )}
                </CharacterCardRow>
              </Card>
              <Spacer y={1} />
            </Fragment>
          ))}
        </>
      )}
    </Container>
  );
}

const CharacterCardRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
