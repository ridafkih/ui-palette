import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import ScreenRender from "./components/ScreenRender";
import React, { useRef } from "react";

function App() {
  const screenRenderRef = useRef(null);
  
  return (
    <>
      <ScreenRender ref={screenRenderRef}></ScreenRender>
      <Header></Header>
      <Viewport screenRender={screenRenderRef}></Viewport>
      <Controls></Controls>
    </>
  );
}

export default App;
