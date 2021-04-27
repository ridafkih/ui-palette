import React from 'react'
import styled from 'styled-components';

import logo from '../icon.png';

const LogoContainer = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding-top: 64px;
`

const Logo = styled.img`
  width: 180px;
`

function Header() {
  return (
    <LogoContainer>
      <Logo src={logo} />
    </LogoContainer>
  )
}

export default Header
