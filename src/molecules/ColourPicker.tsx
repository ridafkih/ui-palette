import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useWindowSize } from "../services/window.service";
import ColourPalette from "../types/colourpalette.interface";

const PickerContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 7px;
`;

const Picker = styled.div`
  width: 16px;
  height: 16px;

  border-radius: 50%;

  color: #FFFFFF;

  background: currentColor;
  box-shadow: 0 0 0 3px #1a1a1a, 0 0 0 6px currentColor;

  transition: 0.16s ease;

  &:not(:last-child) {
    margin-right: 32px;
  }

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const ColourCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

interface SwatchPosition {
  top: number;
  left: number;
}

const defaultColourPalette: ColourPalette = {
  main: "#FFF",
  secondary: "#AFAFAF",
  accent: "#888",
  background: "#000",
};

function ColourPicker(props: {
  onPaletteChange?: (palette: ColourPalette) => void;
}) {
  const windowSize = useWindowSize();

  const colourPicker = useRef<ChromePicker>(null);

  const [colour, setColour] = useState<string>("#FFF");
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [swatchPosition, setSwatchPosition] = useState<SwatchPosition | null>(
    null
  );
  const [colourPalette, setColourPalette] = useState<ColourPalette>(
    defaultColourPalette
  );

  const handleChange = (color: { hex: string }) => {
    if (!selectedSwatch) return;
    setColourPalette({ ...colourPalette, [selectedSwatch]: color.hex });
    setColour(color.hex);
  };

  const handleClick = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    const { colourName, colourValue }: any = currentTarget.dataset;
    setSelectedSwatch(colourName!);
    setColour(colourValue);
  };

  const repositionSwatch = ({ x, y }: { x: number; y: number }) => {
    setSwatchPosition({ left: x, top: y });
  };

  const closeSwatch = () => {
    setSelectedSwatch(null);
    setSwatchPosition(null);
  };

  useEffect(() => {
    if (!selectedSwatch) return;
    const selectedElement = document.querySelector(
      `[data-colour-name="${selectedSwatch}"]`
    );
    const { x, y } = selectedElement!.getBoundingClientRect();
    repositionSwatch({ x, y });
  }, [windowSize, selectedSwatch]);

  useEffect(() => {
    if (props.onPaletteChange) props.onPaletteChange(colourPalette);
  }, [props, colourPalette]);

  return (
    <PickerContainer>
      {swatchPosition ? (
        <>
          <ColourCover onClick={closeSwatch}></ColourCover>
          <ChromePicker
            styles={{
              default: {
                picker: {
                  position: "absolute",
                  top: `${swatchPosition.top}px`,
                  left: `${swatchPosition.left}px`,
                  transform: "translateY(calc(-100% - 20px))",
                },
              },
            }}
            color={colour}
            onChange={handleChange}
            ref={colourPicker}
          />
        </>
      ) : null}
      <Picker
        data-colour-name="main"
        data-colour-value={colourPalette.main}
        style={{ color: colourPalette.main }}
        onClick={handleClick}
      ></Picker>
      <Picker
        data-colour-name="secondary"
        data-colour-value={colourPalette.secondary}
        style={{ color: colourPalette.secondary }}
        onClick={handleClick}
      ></Picker>
      <Picker
        data-colour-name="accent"
        data-colour-value={colourPalette.accent}
        style={{ color: colourPalette.accent }}
        onClick={handleClick}
      ></Picker>
      <Picker
        data-colour-name="background"
        data-colour-value={colourPalette.background}
        style={{ color: colourPalette.background }}
        onClick={handleClick}
      ></Picker>
    </PickerContainer>
  );
}

export default ColourPicker;
