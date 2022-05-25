import styled from "styled-components";
import { useState } from "react";
import { Row, Button, Modal, Text } from "@nextui-org/react";
import { useAppState } from "./state";

export function StorageManager() {
  const { isDirty, save, clearAll } = useAppState();
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
        onPress={() => setShouldConfirm(() => clearAll)}
      >
        Clear Saves
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={!!shouldConfirm}
        onClose={() => setShouldConfirm(null)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Are you sre?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text size={14}>This action can't be reversed</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => setShouldConfirm(null)}
          >
            Nope
          </Button>
          <Button
            auto
            onPress={() => {
              shouldConfirm?.();
              setShouldConfirm(null);
            }}
          >
            Yeah!
          </Button>
        </Modal.Footer>
      </Modal>
    </Column>
  );
}

const Column = styled(Row).attrs({ fluid: false })`
  flex-direction: column;
`;
