import styled from "styled-components";
import { useMemo, useState } from "react";
import { Button, useModal, Modal, Text } from "@nextui-org/react";
import { features as allFeatures, heritages, tags } from "./db";
import { FeatureCard } from "./FeatureCard";

export function AddFeatures({
  features,
  setFeatures,
  className,
  disabled,
  filterByPath,
  filterByHeritage,
  maxSelected,
}) {
  const { setVisible, bindings } = useModal();
  const [selected, setSelected] = useState([]);
  const featureSet = useMemo(() => new Set(selected), [selected]);
  const viableFeatures = useMemo(
    () =>
      Object.keys(allFeatures)
        .filter((id) => {
          if (!filterByPath) {
            return true;
          }
          const feature = allFeatures[id];
          if (feature.tags?.includes("training") && !features.includes(id)) {
            return false;
          }
          const pathTag = feature.tags?.find?.((tag) => tags[tag].isPath);
          if (!pathTag) {
            return true;
          }
          return features.some((f) => allFeatures[f].tags?.includes(pathTag));
        })
        .filter((id) => {
          if (!filterByHeritage) {
            return true;
          }
          const feature = allFeatures[id];
          const heritageTag = feature.tags?.find?.((tag) => heritages[tag]);
          if (!heritageTag) {
            return true;
          }
          return heritageTag === filterByHeritage;
        }),
    [filterByPath, features, filterByHeritage, featureSet]
  );

  return (
    <>
      <Button
        className={className}
        color="secondary"
        disabled={disabled}
        bordered
        size="xl"
        css={{ width: "100%" }}
        onClick={() => {
          setSelected(features);
          setVisible(true);
        }}
      >
        Change Features
      </Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Select Features
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid>
            {viableFeatures.map((id) => (
              <FeatureCard
                key={id}
                feature={id}
                onClick={() => {
                  if (featureSet.has(id)) {
                    setSelected((current) => current.filter((f) => f !== id));
                  } else if (!maxSelected || selected.length < maxSelected) {
                    setSelected((current) => [...current, id]);
                  }
                }}
                css={
                  featureSet.has(id)
                    ? {
                        backgroundColor: "$accents4",
                      }
                    : {}
                }
              />
            ))}
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              setFeatures(selected);
              setVisible(false);
            }}
          >
            Update Features
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: max-content;
  grid-gap: 20px;
  height: 100%;
  width: 100%;

  & > div {
    overflow: hidden;
  }
`;
