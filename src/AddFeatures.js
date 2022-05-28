import styled from "styled-components";
import { useMemo, useState } from "react";
import { Button, useModal, Modal, Text } from "@nextui-org/react";
import { features as allFeatures } from "./db";
import { FeatureCard } from "./FeatureCard";

export function AddFeatures({ features, setFeatures, className }) {
  const { setVisible, bindings } = useModal();
  const [selected, setSelected] = useState([]);
  const featureSet = useMemo(() => new Set(selected), [selected]);

  return (
    <>
      <Button
        className={className}
        color="secondary"
        bordered
        size="xl"
        css={{ width: "100%" }}
        onClick={() => {
          setSelected(features);
          setVisible(true);
        }}
      >
        Add Feature
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
            {Object.keys(allFeatures).map((id) => (
              <FeatureCard
                key={id}
                feature={id}
                onClick={() => {
                  if (featureSet.has(id)) {
                    setSelected((current) => current.filter((f) => f !== id));
                  } else {
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
