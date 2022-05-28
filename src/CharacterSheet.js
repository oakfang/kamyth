import styled from "styled-components";
import { Button, Card, Container, Spacer, Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

import { FeatureList } from "./FeatureList";
import { Confirmation, useConfirmation } from "./Confirmation";
import { heritages, npcLevels, npcTraits, trainings } from "./db";
import { useAppState } from "./state";
import { PublishCharacterModel, useMediaQuery } from "./common";
import { AttributesPanel } from "./AttributesPanel";

export function CharacterSheet({ npcs = false }) {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const showHeaders = useMediaQuery("(min-width: 850px)");
  const scope = npcs ? "npcs" : "characters";
  const {
    getCharacter,
    updateCharacter: baseUpdateCharacter,
    removeCharacter,
    userId,
  } = useAppState();
  const updateCharacter = useCallback(
    (...args) => {
      return baseUpdateCharacter(...args, scope);
    },
    [scope, baseUpdateCharacter]
  );
  const { isLoading, data: character } = useQuery(
    [userId, scope, characterId],
    () => getCharacter(characterId, scope)
  );
  const [showPublish, setShowPublish] = useState(false);
  const [removeModalProps, doRemoveCharacter] = useConfirmation(() => {
    removeCharacter(characterId, scope);
    navigate("..");
  });
  const isEditable = userId === character?.userId;

  if (isLoading || !character) {
    return null;
  }

  return (
    <Container>
      <Spacer y={1} />
      <SheetGrid>
        <CharacterDetails bordered>
          <Text h1>{character.name}</Text>
          {npcs ? (
            <NPCIntro character={character} />
          ) : (
            <PCIntro character={character} />
          )}
        </CharacterDetails>

        {isEditable ? (
          <CharacterControls bordered>
            {showHeaders && <Text h4>Controls</Text>}
            <Spacer y={0.5} />
            <div className="controls-grid">
              <div className="share">
                <Button color="gradient" onClick={() => setShowPublish(true)}>
                  Publish
                </Button>
                <PublishCharacterModel
                  character={character}
                  show={showPublish}
                  close={() => setShowPublish(false)}
                />
              </div>
              {npcs ? null : (
                <>
                  <div className="sub-attrs">
                    <Button
                      bordered
                      color="primary"
                      disabled={
                        character.health >= 8 || (character.xp ?? 0) < 1
                      }
                      onClick={() =>
                        updateCharacter(characterId, [
                          ["health", character.health + 1],
                          ["xp", character.xp - 1],
                        ])
                      }
                    >
                      Advance Health
                    </Button>
                    <Button
                      bordered
                      color="primary"
                      disabled={character.power >= 8 || (character.xp ?? 0) < 1}
                      onClick={() =>
                        updateCharacter(characterId, [
                          ["power", character.power + 1],
                          ["xp", character.xp - 1],
                        ])
                      }
                    >
                      Advance Power
                    </Button>
                  </div>
                  <div className="attrs">
                    <Button
                      bordered
                      color="secondary"
                      disabled={character.body >= 3 || (character.xp ?? 0) < 2}
                      onClick={() =>
                        updateCharacter(characterId, [
                          ["body", character.body + 1],
                          ["xp", character.xp - 2],
                        ])
                      }
                    >
                      Advance Body
                    </Button>
                    <Button
                      bordered
                      color="secondary"
                      disabled={character.mind >= 3 || (character.xp ?? 0) < 2}
                      onClick={() =>
                        updateCharacter(characterId, [
                          ["mind", character.mind + 1],
                          ["xp", character.xp - 2],
                        ])
                      }
                    >
                      Advance Mind
                    </Button>
                    <Button
                      bordered
                      color="secondary"
                      disabled={character.soul >= 3 || (character.xp ?? 0) < 2}
                      onClick={() =>
                        updateCharacter(characterId, [
                          ["soul", character.soul + 1],
                          ["xp", character.xp - 2],
                        ])
                      }
                    >
                      Advance Soul
                    </Button>
                  </div>
                </>
              )}
              <div className="dangerous">
                <Button bordered color="error" onClick={doRemoveCharacter}>
                  Delete "{character.name}"
                </Button>
                <Confirmation {...removeModalProps} />
              </div>
            </div>
          </CharacterControls>
        ) : null}

        <CharacterAttributes bordered>
          {showHeaders && <Text h4>Stats</Text>}
          <AttributesPanel npcs={npcs} {...{ character, updateCharacter }} />
        </CharacterAttributes>

        <CharacterFeatures bordered>
          {showHeaders && <Text h4>Features</Text>}
          <Spacer y={1} />
          <FeatureGrid>
            <FeatureList
              forceUses={npcs ? "capacity" : undefined}
              features={character.features}
              character={character}
              updateCharacter={updateCharacter}
              userId={userId}
            />
          </FeatureGrid>
        </CharacterFeatures>
      </SheetGrid>
    </Container>
  );
}

const SheetGrid = styled.div`
  display: grid;
  gap: 10px;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "details"
      "attributes"
      "features"
      "controls";
  }

  @media (min-width: 1301px) and (max-width: 1440px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-areas:
      "details details controls controls attributes attributes attributes attributes"
      "  .         .   controls controls attributes attributes attributes attributes"
      "features  features  features  features  features  features  features features";
  }

  @media (min-width: 1441px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "details details   attributes attributes attributes attributes attributes features  features  features  features  features  features"
      "controls controls attributes attributes attributes attributes attributes features  features  features  features  features  features";
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 5px;

  @media (max-width: 1440px) and (min-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CharacterDetails = styled(Card)`
  grid-area: details;

  .info {
    display: flex;
    flex-direction: column;

    @media (max-width: 1300px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const CharacterControls = styled(Card)`
  grid-area: controls;

  .controls-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;

    > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .dangerous {
      flex: 1;
      justify-content: end;
    }
  }
`;

const CharacterAttributes = styled(Card)`
  grid-area: attributes;
`;

const CharacterFeatures = styled(Card)`
  grid-area: features;
`;

function PCIntro({ character }) {
  const heritage = heritages[character.heritage];
  const training = trainings[character.training];

  return (
    <div className="info">
      <div>
        <Text h3>Heritage: {heritage.title}</Text>
        <Text h4 color="var(--nextui-colors-accents5)">
          {heritage.description}
        </Text>
      </div>
      <div>
        <Text h3>Training: {training.title}</Text>
        <Text h4 color="var(--nextui-colors-accents5)">
          {training.description}
        </Text>
      </div>
      {character.xp ? (
        <div>
          <Text h5>Available XP: {character.xp}</Text>
        </div>
      ) : null}
    </div>
  );
}

function NPCIntro({ character }) {
  const characterTitle = npcLevels[character.level].title;
  return (
    <div className="info">
      <div>
        <Text h3>{character.isGroup ? `A group of ${characterTitle}s` : characterTitle}</Text>
      </div>
      <div>
        <Text h5 color="var(--nextui-colors-accents5)">
          {character.traits.map((t) => npcTraits[t].title).join(", ")}
        </Text>
      </div>
    </div>
  );
}
