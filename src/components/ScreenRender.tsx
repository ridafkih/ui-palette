import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ColourPalette from "../types/colourpalette.interface";

const ScreenCanvas = styled.canvas<{ width: string; height: string }>`
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
  { colours: ColourPalette | null }
>(({ colours }, ref) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (ref && typeof ref !== "function") {
      const { current: canvas } = ref;
      setContext(canvas!.getContext("2d"));
    }
  }, [ref]);

  useEffect(() => {
    if (!context || !colours) return;
    const { canvas } = context;
    context.fillStyle = colours.main;
    context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
    context.fillStyle = colours.secondary;
    context.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
    context.fillStyle = colours.accent;
    context.fillRect(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    context.fillStyle = colours.background;
    context.fillRect(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      canvas.height / 2
    );
  }, [colours, context]);

  return <ScreenCanvas ref={ref} width="1280" height="2048"></ScreenCanvas>;
});

export default ScreenRender;
