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
import { Fragment } from "react";
import { AttributesChart } from "./AttributesChart";
import { heritages, trainings } from "./db";
import { useAppState } from "./state";

function CreateCharacterButton({ children }) {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Button size="xl" color="gradient" onPress={() => navigate("new")}>
        {children}
      </Button>
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
                <Row>
                  <Col>
                    <Text h2>{c.name}</Text>
                    <Text h3>
                      A
                      {trainings[c.training].title.match(/^(aeuih)/i)
                        ? "n"
                        : ""}{" "}
                      {trainings[c.training].title} of the{" "}
                      {heritages[c.heritage].title}
                    </Text>
                  </Col>
                  <Col span={4}>
                    <AttributesChart width="200px" labels={false} {...c} />
                  </Col>
                </Row>
              </Card>
              <Spacer y={1} />
            </Fragment>
          ))}
        </>
      )}
    </Container>
  );
}
