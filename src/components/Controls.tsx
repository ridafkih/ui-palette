import React from "react";
import styled from "styled-components";

import Selector from "../molecules/Selector";

const ControlTitle = styled.div`
  color: #999999;
  margin-left: 6px;
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
        <ControlTitle>App Type</ControlTitle>
        <Selector
          options={[
            {
              default: true,
              content: "Social App",
            },
            {
              default: false,
              content: "Image App",
            },
            {
              default: false,
              content: "Blog App",
            },
          ]}
        ></Selector>
      </ControlContainer>
      <ControlContainer>
        <ControlTitle>View Type</ControlTitle>
        <Selector
          options={[
            {
              default: true,
              content: "3D View",
            },
            {
              default: false,
              content: "2D View",
            }
          ]}
        ></Selector>
      </ControlContainer>
    </ControlsContainer>
  );
}

export default Controls;
