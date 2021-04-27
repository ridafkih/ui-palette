import React from "react";
import styled from "styled-components";
import ColourPicker from "../molecules/ColourPicker";

import Selector from "../molecules/Selector";

const ControlTitle = styled.div<{ margin?: number }>`
  color: #999999;
  margin-left: ${props => props.margin || 0}px;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 16px;
`;

const ControlsContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  padding-bottom: 64px;

  display: flex;
  justify-content: center;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0 16px;
`;

function Controls() {
  return (
    <ControlsContainer>
      <ControlContainer>
        <ControlTitle>Colour Selection</ControlTitle>
        <ColourPicker></ColourPicker>
      </ControlContainer>
      <ControlContainer>
        <ControlTitle>App Type</ControlTitle>
        <Selector
          options={[
            {
              label: "Social App",
              value: "social-app"
            },
            {
              label: "Image App",
              value: "image-app"
            },
            {
              label: "Blog App",
              value: "blog-app"
            },
          ]}
        ></Selector>
      </ControlContainer>
      <ControlContainer>
        <ControlTitle>View Type</ControlTitle>
        <Selector
          options={[
            {
              label: "3D View",
              value: "3d-view"
            },
            {
              label: "2D View",
              value: "2d-view"
            }
          ]}
        ></Selector>
      </ControlContainer>
    </ControlsContainer>
  );
}

export default Controls;
