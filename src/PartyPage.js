import styled from "styled-components";
import { Fragment, useState, useMemo } from "react";
import {
  Container,
  Card,
  Text,
  Spacer,
  Input,
  Button,
  Table,
  Loading,
} from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAppState } from "./state";
import { getPartyMembers, getUsernameById } from "./api";
import { useAuthLock } from "./Auth";

export function PartyPage() {
  useAuthLock();
  const { userId, updateCharacter } = useAppState();

  const { data: members = [] } = useQuery([userId, "pcs"], () =>
    getPartyMembers(userId)
  );
  const userIds = useMemo(() => {
    const allIds = members.map((pc) => pc.userId);
    const distinct = new Set(allIds);
    return Array.from(distinct);
  }, [members]);
  const { data: usersById = {} } = useQuery([userId, "usersById"], () =>
    getUsernameById(userIds)
  );
  const columns = useMemo(
    () => [
      { key: "pcName", label: "PC NAME" },
      { key: "playerName", label: "PLAYER NAME" },
      { key: "xp", label: "XP" },
      { key: "actions", label: "ACTIONS" },
    ],
    []
  );
  const items = useMemo(
    () =>
      members.map((pc) => ({
        key: pc.id,
        pcName: <Link to={`/characters/${pc.id}`}>{pc.name}</Link>,
        playerName: usersById[pc.userId] || <Loading color="white" />,
        xp: pc.xp ?? 0,
        actions: (
          <Button
            auto
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              updateCharacter(pc.id, "xp", (pc.xp ?? 0) + 1);
            }}
          >
            Award XP
          </Button>
        ),
      })),
    [members, usersById]
  );

  return (
    <Container>
      <Spacer y={1} />
      <Card bordered>
        <Text h3>Add Party Member</Text>
        <Spacer y={2} />
        <AddMember />
      </Card>
      <Spacer y={1} />
      <MembersTable />
    </Container>
  );
}

function MembersTable() {
  const { userId, updateCharacter } = useAppState();

  const { data: members = [] } = useQuery([userId, "pcs"], () =>
    getPartyMembers(userId)
  );
  const userIds = useMemo(() => {
    const allIds = members.map((pc) => pc.userId);
    const distinct = new Set(allIds);
    return Array.from(distinct);
  }, [members]);
  const { data: usersById = {} } = useQuery([userId, "usersById"], () =>
    getUsernameById(userIds)
  );
  const columns = useMemo(
    () => [
      { key: "pcName", label: "PC NAME" },
      { key: "playerName", label: "PLAYER NAME" },
      { key: "xp", label: "XP" },
      { key: "actions", label: "ACTIONS" },
    ],
    []
  );
  const items = useMemo(
    () =>
      members.map((pc) => ({
        key: pc.id,
        pcName: <Link to={`/characters/${pc.id}`}>{pc.name}</Link>,
        playerName: usersById[pc.userId] || <Loading color="white" />,
        xp: pc.xp ?? 0,
        actions: (
          <ActionsRow>
            <Button
              auto
              color="success"
              onClick={() => {
                updateCharacter(pc.id, "xp", (pc.xp ?? 0) + 1);
              }}
            >
              Award XP
            </Button>
            <Button
              auto
              color="error"
              onClick={() => {
                updateCharacter(pc.id, "gmId", null);
              }}
            >
              Remove from Party
            </Button>
          </ActionsRow>
        ),
      })),
    [members, usersById]
  );

  if (!items.length) {
    return null;
  }

  return (
    <Table
      aria-label="Party Members"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={items}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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
        css={{ width: "100%" }}
        color={isError ? "error" : undefined}
        bordered={isError}
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
    </form>
  );
}

const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  width: min-content;
`;
