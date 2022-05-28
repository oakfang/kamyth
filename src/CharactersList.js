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
import { AttributesChart, NPCAttributesChart } from "./AttributesChart";
import { heritages, npcLevels, npcTraits, trainings } from "./db";
import { useAppState } from "./state";
import { ImportCharacterModel, useMediaQuery } from "./common";

function CreateCharacterButton({ children, npc = false }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { addCharacter, addNPC } = useAppState();
  return (
    <Row fluid justify="space-between" wrap="wrap">
      <Button size="xl" color="gradient" onPress={() => navigate("new")}>
        {children}
      </Button>
      <Button size="xl" bordered color="gradient" onPress={() => setShow(true)}>
        Import {npc ? "NPC" : "Character"}
      </Button>
      <ImportCharacterModel
        title={`Import ${npc ? "NPC" : "Character"}`}
        show={show}
        close={() => setShow(false)}
        onImport={npc ? addNPC : addCharacter}
      />
    </Row>
  );
}

function EmptyState({ showNPCs }) {
  return (
    <>
      <Card bordered>
        <Text h6>No {showNPCs ? "NPCs" : "characters"}... yet.</Text>
      </Card>
      <Spacer y={0.5} />
      <CreateCharacterButton npc={showNPCs}>
        Create First {showNPCs ? "NPC" : "Character"}
      </CreateCharacterButton>
    </>
  );
}

export function CharacterList({ showNPCs = false }) {
  const { characters, npcs } = useAppState();
  const navigate = useNavigate();
  const showCharts = useMediaQuery("(min-width: 750px)");
  const entities = showNPCs ? npcs : characters;

  if (!entities) {
    return null;
  }

  return (
    <Container xs>
      <Spacer y={1} />
      {entities.length === 0 ? (
        <EmptyState showNPCs={showNPCs} />
      ) : (
        <>
          <CreateCharacterButton>Create a New Character</CreateCharacterButton>
          <Spacer y={1} />
          {entities.map((c) => (
            <Fragment key={c.id}>
              <Card clickable bordered onClick={() => navigate(c.id)}>
                <CharacterCardRow>
                  <div>
                    <Text h2>{c.name}</Text>
                    {showNPCs ? (
                      <>
                        <Text h3>{npcLevels[c.level].title}</Text>
                        <Text h5 color="var(--nextui-colors-accents5)">
                          {c.traits.map((t) => npcTraits[t].title).join(", ")}
                        </Text>
                      </>
                    ) : (
                      <Text h3>
                        {`Master ${trainings[c.training].title} of the ${
                          heritages[c.heritage].title
                        }`}
                      </Text>
                    )}
                  </div>
                  {showCharts &&
                    (showNPCs ? (
                      <NPCAttributesChart width="200px" labels={false} {...c} />
                    ) : (
                      <AttributesChart width="200px" labels={false} {...c} />
                    ))}
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
