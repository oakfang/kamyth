import { useMemo } from "react";
import { heritages, trainings } from "./db";

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
