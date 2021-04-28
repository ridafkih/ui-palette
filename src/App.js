import Header from "./components/Header";
import Viewport from "./components/Viewport";
import Controls from "./components/Controls";
import Canvas from "./components/Canvas";

function App() {
  return (
    <>
      <Canvas></Canvas>
      <Header></Header>
      <Viewport></Viewport>
      <Controls></Controls>
    </>
  );
}

export default App;
