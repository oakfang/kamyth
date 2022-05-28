import styled from "styled-components";
import { Button, Loading } from "@nextui-org/react";

export function SubmitCharacter({ isValid, name, isLoading, onSubmit }) {
  if (!isValid) return null;

  return (
    <Submit>
      <Button size="xl" color="gradient" onPress={onSubmit}>
        {isLoading ? <Loading color="white" /> : `Create ${name}`}
      </Button>
    </Submit>
  );
}

const Submit = styled.section`
  grid-area: submit;

  button {
      width: 100%;
  }
`;
