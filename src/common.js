import lzbase62 from "lzbase62";
import { useMemo, useState, useEffect } from "react";
import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import { heritages, trainings } from "./db";

export function PublishCharacterModel({ character, show, close }) {
  const token = useMemo(() => {
    if (!show) return "";
    return lzbase62.compress(JSON.stringify(character));
  }, [character, show]);
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={show}
      onClose={close}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Publish Character
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          readOnly
          label="Token"
          bordered
          color="secondary"
          initialValue={token}
        />
      </Modal.Body>
    </Modal>
  );
}

export function ImportCharacterModel({ onImport, show, close: preClose }) {
  const [token, setToken] = useState("");
  const close = () => {
    setToken("");
    preClose();
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={show}
      onClose={close}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Import Character
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          bordered
          color="secondary"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          label="Token"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            close();
            onImport(JSON.parse(lzbase62.decompress(token)));
          }}
          disabled={!token}
        >
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function getBody({ heritage, training }) {
  return (
    1 + (heritages[heritage]?.body ?? 0) + (trainings[training]?.body ?? 0)
  );
}

function getMind({ heritage, training }) {
  return (
    1 + (heritages[heritage]?.mind ?? 0) + (trainings[training]?.mind ?? 0)
  );
}

function getSoul({ heritage, training }) {
  return (
    1 + (heritages[heritage]?.soul ?? 0) + (trainings[training]?.soul ?? 0)
  );
}

function getHealth({ heritage, training }) {
  return (
    4 + (heritages[heritage]?.health ?? 0) + (trainings[training]?.health ?? 0)
  );
}

function getPower({ heritage, training }) {
  return (
    4 + (heritages[heritage]?.power ?? 0) + (trainings[training]?.power ?? 0)
  );
}

export function useStats({ heritage, training }) {
  const body = useMemo(
    () => getBody({ heritage, training }),
    [heritage, training]
  );
  const mind = useMemo(
    () => getMind({ heritage, training }),
    [heritage, training]
  );
  const soul = useMemo(
    () => getSoul({ heritage, training }),
    [heritage, training]
  );
  const health = useMemo(
    () => getHealth({ heritage, training }),
    [heritage, training]
  );
  const power = useMemo(
    () => getPower({ heritage, training }),
    [heritage, training]
  );
  const features = [
    ...(heritages[heritage]?.features ?? []),
    ...(trainings[training]?.features ?? []),
  ];

  return { body, mind, soul, health, power, features };
}

export function useMediaQuery(mq) {
  const mql = useMemo(() => matchMedia(mq), [mq]);
  const [matches, setMatches] = useState(() => mql.matches);
  useEffect(() => {
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, [mql]);

  return matches;
}
