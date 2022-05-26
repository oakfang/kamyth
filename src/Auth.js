import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Text,
  Spacer,
  Button,
  Loading,
  Checkbox,
} from "@nextui-org/react";
import { useMutation } from "react-query";
import { useAppState } from "./state";

export function useAuthLock() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppState();

  useEffect(() => {
    if (isLoggedIn) return;
    navigate("/");
  }, [isLoggedIn, navigate]);
}

export function Auth() {
  const { isLoggedIn, signUp } = useAppState();

  if (isLoggedIn) {
    return <Navigate to="/characters" replace={true} />;
  }

  return (
    <CenterColumn>
      <LoginFormContainer>
        <Text h2>Log In to Character Keeper</Text>

        <LoginCard title="Welcome!" cta="Sign In" onSubmit={signUp} />
      </LoginFormContainer>
    </CenterColumn>
  );
}

function LoginCard({ title, cta, onSubmit }) {
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldCreate, setShouldCreate] = useState(false);
  const { isLoading, mutateAsync, isError } = useMutation(onSubmit, {
    onSettled: () => {
      setPassword("");
    },
  });

  const valid = password && username;

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    try {
      await mutateAsync({ username, password, shouldCreate });
    } catch {
      inputRef.current?.focus();
    }
  }

  return (
    <Card bordered>
      <Text h3>{title}</Text>
      <Spacer y={1.5} />
      <form onSubmit={onFormSubmit}>
        <Input
          labelPlaceholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Spacer y={1} />
        <Input.Password
          ref={inputRef}
          bordered={isError}
          color={isError ? "error" : undefined}
          labelPlaceholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {valid ? (
          <>
            <Spacer y={0.5} />
            <Checkbox selected={shouldCreate} onChange={setShouldCreate}>
              Create new user
            </Checkbox>
          </>
        ) : null}
        <Spacer y={1} />
        <Button disabled={!valid} type="submit">
          {isLoading ? <Loading color="white" /> : cta}
        </Button>
      </form>
    </Card>
  );
}

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginFormContainer = styled(CenterColumn)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 10px;
  gap: 10px;
  max-width: 400px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
