import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";
import generate from "japanese-name-generator";

export function CharacterName({ name, setName, isValid = true }) {
  return (
    <CharacterNameContainer>
      <Input
        color={name ? (isValid ? "success" : "primary") : "warning"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="xl"
        clearable
        label="Character Name"
        placeholder="Izumi Shenjo"
      />
      <Button.Group color="secondary">
        <Button onClick={() => setName(generate({ gender: "male" }).name)}>
          Random ♂
        </Button>
        <Button onClick={() => setName(generate({ gender: "female" }).name)}>
          Random ♀
        </Button>
      </Button.Group>
    </CharacterNameContainer>
  );
}

const CharacterNameContainer = styled.section`
  grid-area: name;
  display: flex;
  align-items: flex-end;

  @media (max-width: 700px) {
    flex-wrap: wrap;
  }
`;
