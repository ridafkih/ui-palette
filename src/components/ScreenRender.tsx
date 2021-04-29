import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FeedApp from "../layouts/FeedApp";
import ImageApp from "../layouts/ImageApp";

import ColourPalette from "../types/colourpalette.interface";

const ScreenCanvas = styled.canvas<{ width: string; height: string }>`
  /* display: none; */

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
  const svgScreen = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgScreen.current || !context) return;

    const { outerHTML } = svgScreen.current;
    const { canvas } = context;

    const blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const image = new Image();

    image.onload = () =>
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

    image.src = URL.createObjectURL(blob);
  }, [colours, context, layout]);

  useEffect(() => {
    if (ref && typeof ref !== "function") {
      const { current: canvas } = ref;
      setContext(canvas!.getContext("2d"));
    }
  }, [ref, svgScreen]);

  return (
    <>
      {layout === "social-app" && colours && (
        <FeedApp colours={colours} ref={svgScreen}></FeedApp>
      )}
      {layout === "image-app" && colours && (
        <ImageApp colours={colours} ref={svgScreen}></ImageApp>
      )}
      <ScreenCanvas ref={ref} width="1024" height="2048"></ScreenCanvas>
    </>
  );
});

export default ScreenRender;
