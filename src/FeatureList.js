import { useState, useMemo } from "react";
import { FeatureCard } from "./FeatureCard";
import { features } from "./db";

function InvokableFeatureCard({
  feature: featureId,
  character,
  updateCharacter,
}) {
  const [active, setActive] = useState(false);
  const feature = features[featureId];
  const invokable = useMemo(() => {
    if (!feature.invoke) {
      return false;
    }
    if (!Array.isArray(feature.invoke)) {
      return character.current.power + feature.invoke >= 0;
    }
    const [onActivate] = feature.invoke;
    return active || character.current.power + onActivate >= 0;
  }, [feature.invoke, character.current.power, active]);

  const onPress =
    invokable &&
    (() => {
      if (!invokable) return;
      if (!Array.isArray(feature.invoke)) {
        return updateCharacter(
          character.id,
          "current.power",
          Math.min(
            character.power,
            Math.max(0, character.current.power + feature.invoke)
          )
        );
      }
      const [onActivate, onDeactivate] = feature.invoke;
      setActive(!active);
      updateCharacter(
        character.id,
        "current.power",
        Math.min(
          character.power,
          Math.max(
            0,
            character.current.power + (active ? onDeactivate : onActivate)
          )
        )
      );
    });

  return (
    <FeatureCard
      feature={featureId}
      color={active ? "gradient" : "primary"}
      onClick={onPress}
    />
  );
}

export function FeatureList({ features, character, updateCharacter }) {
  return features.map((feature) => (
    <InvokableFeatureCard
      key={feature}
      {...{ feature, character, updateCharacter }}
    />
  ));
}
