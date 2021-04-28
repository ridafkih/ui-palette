import React, { useEffect } from "react";
import styled from "styled-components";

const ScreenCanvas = styled.canvas`
  width: 1280px;
  height: 2048px;

  position: fixed;
  top: 8px;
  right: 8px;

  transform: scale(0.2);
  transform-origin: top right;
`;

function ScreenRender(props: any, ref: any) {
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFF";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
  }, [ref]);

  return <ScreenCanvas ref={ref}></ScreenCanvas>;
}

export default React.forwardRef(ScreenRender);
