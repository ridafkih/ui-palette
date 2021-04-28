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

function ScreenRender(
  { colours }: { colours: ColourPalette | null },
  ref: any
) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const { current: canvas } = ref;
    setContext(canvas.getContext("2d"));
  }, [ref]);

  useEffect(() => {
    if (!context || !colours) return;
    context.fillStyle = "#FFFFFF";
  }, [colours, context]);

  return <ScreenCanvas ref={ref} width="1280" height="2048"></ScreenCanvas>;
}

export default React.forwardRef(ScreenRender);
