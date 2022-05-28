import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useResizeObserver } from "../common";
import { useAppState } from "../state";
import { CharacterName } from "./CharacterName";
import { CharacterChoice } from "./CharacterChoice";
import { CharacterSummary } from "./CharacterSummary";
import { SubmitCharacter } from "./SubmitCharacter";
import { CharacterMultiChoice } from "./CharacterMultiChoice";

export function CharacterCreationFramework({
  className,
  npcs,
  attributes,
  features,
  character,
  choices,
  validator,
}) {
  const [name, setName] = useState("");
  const [ref, { height }] = useResizeObserver();
  const navigate = useNavigate();
  const { addCharacter } = useAppState();
  const { mutate, isLoading } = useMutation(
    (character) => {
      return addCharacter(character, npcs ? "npcs" : "characters");
    },
    {
      onSuccess: (character) => {
        navigate(`../${character.id}`);
      },
    }
  );
  const isValid = validator({ name });
  const onAdd = () => {
    if (!isValid) return;
    const finalCharacter = {
      id: crypto.randomUUID(),
      ...character,
      ...attributes,
      name,
      features,
    };
    console.log({ finalCharacter });
    mutate(finalCharacter);
  };

  return (
    <Grid
      ref={ref}
      className={className}
      style={{ "--container-height": height ? `${height}px` : "100%" }}
    >
      <CharacterName {...{ name, setName, isValid }} />
      <CharacterSummary
        npcs={npcs}
        attributes={attributes}
        features={features}
      />
      {choices.map((choice, index) => {
        const Choice = choice.multi ? CharacterMultiChoice : CharacterChoice;

        return <Choice key={index} {...choice} />;
      })}
      <SubmitCharacter onSubmit={onAdd} {...{ isLoading, isValid, name }} />
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 10px;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;

  --radio-select-cols: repeat(4, 1fr);
`;
