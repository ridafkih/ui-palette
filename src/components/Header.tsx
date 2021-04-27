import React from 'react'
import styled from 'styled-components';

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;

  font-size: 64px;
  font-weight: 600;
`

function Header() {
  return <Logo>UIPalette</Logo>
}

export default Header
