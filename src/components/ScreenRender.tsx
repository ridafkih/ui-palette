import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ColourPalette from "../types/colourpalette.interface";

import { layouts } from "../services/layouts.service";

const ScreenCanvas = styled.canvas<{ width: string; height: string }>`
  display: none;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  position: fixed;
  top: 8px;
  right: 8px;

  transform: scale(0.2);
  transform-origin: top right;
`;

const ScreenRender = React.forwardRef<
  HTMLCanvasElement,
  { colours: ColourPalette | null; layout: string | null }
>(({ colours, layout }, ref) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (ref && typeof ref !== "function") {
      const { current: canvas } = ref;
      setContext(canvas!.getContext("2d"));
    }
  }, [ref]);

  useEffect(() => {
    if (!context || !layout || !colours) return;
    const screenLayout = layouts.find((x) => x.value === layout);
    if (!screenLayout) return;

    screenLayout.elements.forEach((screenElement) => {
      const { position, dimensions } = screenElement;

      context.fillStyle = colours[screenElement.colorType];
      context.fillRect(
        position.x,
        position.y,
        dimensions.width,
        dimensions.height
      );
    });
  }, [layout, context, colours]);

  return <ScreenCanvas ref={ref} width="1024" height="2048"></ScreenCanvas>;
});

export default ScreenRender;
