import React from 'react'
import styled from 'styled-components';

import Selector from '../molecules/Selector';

const ControlContainer = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function Controls() {
  return (
    <ControlContainer>
      <Selector></Selector>
    </ControlContainer>
  )
}

export default Controls
