import lzbase62 from "lzbase62";
import { useMemo, useState, useEffect, useRef } from "react";
import { Button, Modal, Text, Textarea } from "@nextui-org/react";
import { heritages, npcLevels, npcTraits, trainings } from "./db";

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

export function ImportCharacterModel({
  onImport,
  show,
  close: preClose,
  title = "Import Character",
}) {
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
          {title}
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
            const character = JSON.parse(lzbase62.decompress(token));
            character.id = crypto.randomUUID();
            onImport(character);
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

export function useNPCStats({ isGroup, level, traits }) {
  const traitBases = useMemo(() => {
    return traits.reduce(
      (bases, traitId) => {
        const trait = npcTraits[traitId];
        if (!trait) return bases;
        if (trait.might) {
          bases.might += trait.might;
        }
        if (trait.capacity) {
          bases.capacity += trait.capacity;
        }
        if (trait.menace) {
          bases.menace += trait.menace;
        }
        if (trait.features) {
          bases.features = Array.from(
            new Set([...bases.features, ...trait.features])
          );
        }
        return bases;
      },
      { might: 1, capacity: 1, menace: 1, features: [] }
    );
  }, [traits]);
  const might = useMemo(() => {
    let might = traitBases.might;
    if (level) {
      might += npcLevels[level].might;
    }
    if (isGroup) {
      might += 1;
    }

    return might;
  }, [isGroup, level, traitBases.might]);

  const capacity = useMemo(() => {
    let capacity = traitBases.capacity;
    if (level) {
      capacity += npcLevels[level].capacity;
    }
    if (isGroup) {
      capacity += 4;
    }

    return capacity;
  }, [isGroup, level, traitBases.capacity]);

  const menace = useMemo(() => {
    let menace = traitBases.menace;
    if (level) {
      menace += npcLevels[level].menace;
    }
    if (isGroup) {
      menace += 1;
    }

    return menace;
  }, [isGroup, level, traitBases.menace]);

  return { might, capacity, menace, features: traitBases.features };
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

const defaultState = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export function useResizeObserver() {
  const frameID = useRef(0);
  const ref = useRef(null);

  const [rect, setRect] = useState(defaultState);

  const observer = useMemo(
    () =>
      new ResizeObserver((entries) => {
        const entry = entries[0];

        if (entry) {
          cancelAnimationFrame(frameID.current);

          frameID.current = requestAnimationFrame(() => {
            if (ref.current) {
              setRect(entry.contentRect);
            }
          });
        }
      }),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);

  return [ref, rect];
}
