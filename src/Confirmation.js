import { useState } from "react";
import { Button, Modal, Text } from "@nextui-org/react";

export function useConfirmation(callback) {
  const [show, setShow] = useState(false);
  const onConfirm = () => {
    setShow(false);
    callback();
  };
  const onCancel = () => setShow(false);
  const modalProps = { show, onConfirm, onCancel };
  const open = () => setShow(true);
  return [modalProps, open];
}

export function Confirmation({
  show,
  onConfirm,
  onCancel,
  title = "Are you sre?",
  message = "This action can't be reversed",
  no = "Nope",
  yes = "Yeah!",
}) {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={!!show}
      onClose={() => onCancel()}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text size={14}>{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => onCancel()}>
          {no}
        </Button>
        <Button
          auto
          onPress={() => {
            onConfirm();
          }}
        >
          {yes}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
