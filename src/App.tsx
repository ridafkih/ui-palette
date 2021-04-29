import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import ScreenRender from "./components/ScreenRender";
import React, { useRef, useState } from "react";

import type ColourPalette from "./types/colourpalette.interface";
import type Selection from "./types/selection.interface";

function App() {
  const [layout, setLayout] = useState<string | null>(null);
  const [tilt, setTilt] = useState<boolean>(true);

  const [colourPalette, setColourPalette] = useState<ColourPalette | null>(
    null
  );
  const screenRenderRef = useRef(null);

  const handleColourChange = (palette: ColourPalette) => {
    setColourPalette(palette);
  };

  const handleSelectionChange = ({ fieldName, selectedValue }: Selection) => {
    if (fieldName === "app-screen") 
      setLayout(selectedValue);

    if (fieldName === "view-type") {
      setTilt(selectedValue === "3d-view");
    }
  };

  return (
    <>
      <ScreenRender
        ref={screenRenderRef}
        colours={colourPalette}
        layout={layout}
      ></ScreenRender>
      <Header colourPalette={colourPalette}></Header>
      <Viewport 
        screenRender={screenRenderRef}
        tilt={tilt}
      ></Viewport>
      <Controls
        onPaletteChange={handleColourChange}
        onSelectionChange={handleSelectionChange}
      ></Controls>
    </>
  );
}

export default App;
