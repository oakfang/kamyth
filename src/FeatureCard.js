import { Card, Text } from "@nextui-org/react";
import styled from "styled-components";
import { features, tags } from "./db";

export function FeatureCard({
  feature: featureId,
  color = "primary",
  onClick,
}) {
  const feature = features[featureId];

  return (
    <Card clickable={!!onClick} color={color} onClick={onClick}>
      <Text h3>{feature.title}</Text>
      {feature.description.split("\n").map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
      <TagsRow>
        {(feature.tags ?? []).map((tagId) => {
          const tag = tags[tagId];
          if (!tag) return null;
          return (
            <Tag key={tagId} $fill={tag.fill} $text={tag.text}>
              <Text color="currentColor">{tag.name}</Text>
            </Tag>
          );
        })}
      </TagsRow>
    </Card>
  );
}

const Tag = styled.div`
  padding-inline: 10px;
  border-radius: 10px;
  border: 1px solid currentColor;
  background-color: ${(props) =>
    props.$fill
      ? props.$fill.startsWith("#")
        ? props.$fill
        : `var(--nextui-colors-${props.$fill}, ${props.$fill})`
      : null};
  color: ${(props) =>
    props.$text
      ? props.$text.startsWith("#")
        ? props.$text
        : `var(--nextui-colors-${props.$text}, ${props.$text})`
      : null};
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  &:not(:empty) {
    padding-top: 5px;
  }
`;
