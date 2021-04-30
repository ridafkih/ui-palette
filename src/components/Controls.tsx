import React from "react";
import styled from "styled-components";
import ColourPicker from "../molecules/ColourPicker";

import Selector from "../molecules/Selector";
import ColourPalette from "../types/colourpalette.interface";

import type Selection from '../types/selection.interface';

const ControlTitle = styled.div<{ margin?: number }>`
  color: #999999;
  margin-left: ${(props) => props.margin || 0}px;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 16px;
`;

const ControlsContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  margin-bottom: 64px;

  display: flex;
  justify-content: center;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 8px 16px;
`;

function Controls(props: {
  onPaletteChange?: (palette: ColourPalette) => void;
  onSelectionChange?: (selection: Selection) => void;
}) {
  return (
    <ControlsContainer>
      <ControlContainer>
        <ControlTitle>Colour Selection</ControlTitle>
        <ColourPicker onPaletteChange={props.onPaletteChange}></ColourPicker>
      </ControlContainer>
      <ControlContainer>
        <ControlTitle>App Screen</ControlTitle>
        <Selector
          fieldName="app-screen"
          options={[
            {
              label: "Register",
              value: "register-screen",
            },
            {
              label: "Social",
              value: "social-screen",
            },
            {
              label: "Settings",
              value: "settings-screen",
            },
          ]}
          onSelectionChange={props.onSelectionChange}
        ></Selector>
      </ControlContainer>
      <ControlContainer>
        <ControlTitle>View Type</ControlTitle>
        <Selector
          fieldName="view-type"
          options={[
            {
              label: "3D View",
              value: "3d-view",
            },
            {
              label: "2D View",
              value: "2d-view",
            },
          ]}
          onSelectionChange={props.onSelectionChange}
        ></Selector>
      </ControlContainer>
    </ControlsContainer>
  );
}

export default Controls;
