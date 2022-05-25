import styled from "styled-components";
import { useState } from "react";
import { Row, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "./state";
import { Confirmation } from "./Confirmation";

export function StorageManager() {
  const { isDirty, save, clearAll } = useAppState();
  const navigate = useNavigate();
  const [shouldConfirm, setShouldConfirm] = useState(null);

  return (
    <Column css={{ padding: "$space$5", gap: "$space$2" }}>
      <Button
        size="xs"
        color="gradient"
        disabled={!isDirty}
        onPress={() => setShouldConfirm(() => save)}
      >
        Save
      </Button>
      <Button
        size="xs"
        color="error"
        onPress={() =>
          setShouldConfirm(() => () => {
            navigate("/");
            clearAll();
          })
        }
      >
        Clear Saves
      </Button>
      <Confirmation
        show={shouldConfirm}
        onCancel={() => setShouldConfirm(null)}
        onConfirm={() => {
          shouldConfirm?.();
          setShouldConfirm(null);
        }}
      />
    </Column>
  );
}

const Column = styled(Row).attrs({ fluid: false })`
  flex-direction: column;
`;
