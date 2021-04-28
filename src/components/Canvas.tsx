import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';

const ScreenCanvas = styled.canvas`
  width: 1280px;
  height: 2048px;

  position: fixed;
  top: 8px;
  right: 8px;
  
  transform: scale(.2);
  transform-origin: top right;
`

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFF";

    const image = document.createElement('img');
    image.src = require("../texture/home.png");

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <ScreenCanvas ref={canvasRef}></ScreenCanvas>
  )
}

export default Canvas
