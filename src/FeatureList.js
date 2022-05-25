import { Card, Spacer, Text } from "@nextui-org/react";
import { Fragment, useState } from "react";

function FeatureCard({ feature, character, updateCharacter }) {
  const [active, setActive] = useState(false);
  const invokable = feature.invoke != null;
  const onPress = () => {
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
  };

  return (
    <Card
      clickable={invokable}
      color={active ? "gradient" : "primary"}
      onClick={onPress}
    >
      <Text h3>{feature.title}</Text>
      {feature.description.split("\n").map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Card>
  );
}

export function FeatureList({ features, character, updateCharacter }) {
  return features.map((feature) => (
    <Fragment key={feature.title}>
      <FeatureCard {...{ feature, character, updateCharacter }} />
      <Spacer y={0.5} />
    </Fragment>
  ));
}
