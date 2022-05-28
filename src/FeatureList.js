import { useState, useMemo } from "react";
import { FeatureCard } from "./FeatureCard";
import { features } from "./db";

function InvokableFeatureCard({
  feature: featureId,
  character,
  updateCharacter,
  userId,
  forceUses,
}) {
  const [active, setActive] = useState(false);
  const feature = features[featureId];
  const { preferredUses = "power" } = feature ?? {};
  const uses = forceUses ?? preferredUses;
  const isEditable = userId === character.userId;
  const invokable = useMemo(() => {
    if (!feature.invoke || !isEditable) {
      return false;
    }
    if (!Array.isArray(feature.invoke)) {
      return character.current[uses] + feature.invoke >= 0;
    }
    const [onActivate] = feature.invoke;
    return active || character.current[uses] + onActivate >= 0;
  }, [feature.invoke, character.current[uses], active, isEditable]);

  const onPress =
    invokable &&
    (() => {
      if (!invokable) return;
      if (!Array.isArray(feature.invoke)) {
        return updateCharacter(
          character.id,
          `current.${uses}`,
          Math.min(
            character[uses],
            Math.max(0, character.current[uses] + feature.invoke)
          )
        );
      }
      const [onActivate, onDeactivate] = feature.invoke;
      setActive(!active);
      updateCharacter(
        character.id,
        `current.${uses}`,
        Math.min(
          character[uses],
          Math.max(
            0,
            character.current[uses] + (active ? onDeactivate : onActivate)
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

export function FeatureList({
  features,
  character,
  updateCharacter,
  userId,
  forceUses,
}) {
  return features.map((feature) => (
    <InvokableFeatureCard
      key={feature}
      {...{ feature, character, updateCharacter, userId, forceUses }}
    />
  ));
}
