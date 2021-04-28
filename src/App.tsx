import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import ScreenRender from "./components/ScreenRender";
import React, { useRef, useState } from "react";

import ColourPalette from "./types/colourpalette.interface";

function App() {
  const [colourPalette, setColourPalette] = useState<ColourPalette | null>(
    null
  );
  const screenRenderRef = useRef(null);

  const handleColourChange = (palette: ColourPalette) => {
    setColourPalette(palette);
  };

  return (
    <>
      <ScreenRender
        ref={screenRenderRef}
        colours={colourPalette}
      ></ScreenRender>
      <Header></Header>
      <Viewport screenRender={screenRenderRef}></Viewport>
      <Controls onPaletteChange={handleColourChange}></Controls>
    </>
  );
}

export default App;
