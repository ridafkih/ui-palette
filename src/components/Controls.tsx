import React from 'react'
import styled from 'styled-components';

import Selector from '../molecules/Selector';

const ControlTitle = styled.div`
  margin-left: 4px;
`

const ControlsContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  
  padding: 32px;

  display: flex;
  justify-content: center;
`

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

function Controls() {
  return (
    <ControlsContainer>
      <ControlContainer>
        <ControlTitle>Selector</ControlTitle>
        <Selector options={[
          {
            default: true,
            content: "Social App"
          },
          {
            default: false,
            content: "Image App"
          },
          {
            default: false,
            content: "Blog App"
          }
        ]}></Selector>
      </ControlContainer>
    </ControlsContainer>
  )
}

export default Controls
