import React from "react";
import styled from "styled-components";
import ColourPalette from "../types/colourpalette.interface";

const LogoContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding-top: 64px;
`;

const TextLogo = styled.div`
  font-size: 32px;
  font-weight: 600;
  filter: drop-shadow(2px 2px 0px rgba(255, 255, 255, 1));
`

function Header({colourPalette}: {colourPalette: ColourPalette | null}) {
  return (
    <LogoContainer>
      <TextLogo>
        UI<span className="highlight" style={{ color: colourPalette?.accent }}>Palette</span>
      </TextLogo>
    </LogoContainer>
  );
}

export default Header;
