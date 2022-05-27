import styled from "styled-components";
import { Fragment, useState } from "react";
import {
  Container,
  Card,
  Text,
  Spacer,
  Input,
  Button,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppState } from "./state";
import { getPartyMembers } from "./api";

export function PartyPage() {
  const navigate = useNavigate();
  const { userId, updateCharacter } = useAppState();

  const { data = [] } = useQuery([userId, "pcs"], () =>
    getPartyMembers(userId)
  );
  return (
    <Container>
      <Spacer y={1} />
      <Card bordered>
        <Text h3>Add Party Member</Text>
        <Spacer y={2} />
        <AddMember />
      </Card>
      <Spacer y={2} />
      {data.map((character) => {
        return (
          <Fragment key={character.id}>
            <Card
              bordered
              clickable
              onClick={() => navigate(`/characters/${character.id}`)}
            >
              <MemberRow>
                <Text h4 key={character.id}>
                  {character.name} ({character.xp ?? 0}XP)
                </Text>
                <Button
                  auto
                  color="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCharacter(
                      character.id,
                      "xp",
                      (character.xp ?? 0) + 1
                    );
                  }}
                >
                  Award XP
                </Button>
              </MemberRow>
            </Card>
            <Spacer y={1} />
          </Fragment>
        );
      })}
    </Container>
  );
}

function AddMember() {
  const [memberId, setMemberId] = useState("");
  const { addMember } = useAppState();
  const { isError, mutate } = useMutation(addMember, {
    onSettled() {
      setMemberId("");
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!memberId) return;
    mutate({ memberId });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        labelPlaceholder="Character ID"
        size="lg"
        color={isError ? "error" : undefined}
        bordered={isError}
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
    </form>
  );
}

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
