import { useRef, useEffect } from 'react';

import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  Object3D
} from "three";

import ThreeJSRenderer from "../services/renderer.service";

import { loadObject } from "../services/object.service";
import { ObjectStateObserverHandler } from "../services/state.service";
import { applyTextureToChild } from "../services/texture.service";
import { setEnvironmentMap } from "../services/env.service";

const objectStateHandler = new ObjectStateObserverHandler();

const scene: Scene = new Scene();
scene.background = null;

const renderer: ThreeJSRenderer = new ThreeJSRenderer(scene, { antialias: true, alpha: true });
const camera: PerspectiveCamera = renderer.camera;
setEnvironmentMap(renderer, "./environments/env.pic");

const ambientLight = new AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const pointLight = new PointLight(0xffffff, 0.1);
pointLight.position.set(64, 64, 0);
scene.add(pointLight);

(async () => {
  const model: Object3D = await loadObject(
    scene,
    "./models/iphone_12_pro/model.glb"
  );

  const reference = objectStateHandler.add(model, "iPhone");
  reference.state.position.z = -150;

  document.addEventListener("mousemove", ({ clientX, clientY }) => {
    const xMidRef = (clientX - window.innerWidth / 2) / window.innerWidth;
    const yMidRef = (clientY - window.innerHeight / 2) / window.innerHeight;
  
    reference.state.rotation.y = xMidRef * 0.5;
    reference.state.rotation.x = yMidRef * 0.5;
  });

  applyTextureToChild(model, "Screen_Wallpaper_0", "./texture/home.png");
})();

animate();
function animate() {
  requestAnimationFrame(animate);
  objectStateHandler.updateObjects();
  renderer.render(scene, camera);
}

function Viewport() {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.appendChild(renderer.domElement);
  }, []);

  return (
    <div id="viewport" ref={viewport}></div>
  )
}

export default Viewport
