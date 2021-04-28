import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import ScreenRender from "./components/ScreenRender";
import React, { useRef, useState } from "react";

import type ColourPalette from "./types/colourpalette.interface";
import type Selection from "./types/selection.interface";

function App() {
  const [colourPalette, setColourPalette] = useState<ColourPalette | null>(
    null
  );
  const screenRenderRef = useRef(null);

  const handleColourChange = (palette: ColourPalette) => {
    setColourPalette(palette);
  };

  const handleSelectionChange = (selection: Selection) => {
    console.log(selection);
  }

  return (
    <>
      <ScreenRender
        ref={screenRenderRef}
        colours={colourPalette}
      ></ScreenRender>
      <Header></Header>
      <Viewport screenRender={screenRenderRef}></Viewport>
      <Controls 
        onPaletteChange={handleColourChange}
        onSelectionChange={handleSelectionChange}
      ></Controls>
    </>
  );
}

export default App;
