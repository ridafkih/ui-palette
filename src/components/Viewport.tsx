import React, { useRef, useEffect } from "react";

import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  Object3D,
} from "three";

import ThreeJSRenderer from "../services/renderer.service";

import { loadObject } from "../services/object.service";
import { ObjectStateObserverHandler } from "../services/state.service";
import { applyTextureToChild } from "../services/texture.service";
import { setEnvironmentMap } from "../services/env.service";
import { useWindowSize } from "../services/window.service";

const objectStateHandler = new ObjectStateObserverHandler();

const scene: Scene = new Scene();
scene.background = null;

const renderer: ThreeJSRenderer = new ThreeJSRenderer(scene, {
  antialias: true,
  alpha: true,
});
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
  reference.addCustomState("cursorOut", false);
  reference.state.position.z = -120;

  function handleMouseMovement({ clientX, clientY }: MouseEvent) {
    reference.setCustomState("cursorOut", false);

    const targetX =
      ((clientX - window.innerWidth / 2) / window.innerWidth) * 0.25;
    const targetY =
      ((clientY - window.innerHeight / 2) / window.innerHeight) * 0.25;

    reference.state.rotation.y = targetX;
    reference.state.rotation.x = targetY;
  }

  function handleMouseLeave() {
    reference.setCustomState("cursorOut", true);
  }

  document.addEventListener("mousemove", handleMouseMovement);
  document.addEventListener("mouseleave", handleMouseLeave);

  applyTextureToChild(model, "Screen_Wallpaper_0", "./texture/home.png");

  return () => {
    document.removeEventListener("mousemove", handleMouseMovement);
    document.removeEventListener("mouseleave", handleMouseLeave);
  };
})();

animate();
function animate() {
  requestAnimationFrame(animate);
  objectStateHandler.updateObjects();
  renderer.render(scene, camera);

  // ** CUSTOM STATE OBSERVERS
  const [reference] = objectStateHandler.getObjectsByName("iPhone");
  if (!reference) return;
  const cursorOut = reference.getCustomState("cursorOut");
  if (cursorOut) {
    reference.state.rotation.x *= 0.85;
    reference.state.rotation.y *= 0.85;
    reference.state.rotation.z *= 0.85;
  }
}

function Viewport() {
  const windowSize = useWindowSize();
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.appendChild(renderer.domElement);
    renderer.updateViewport();
  }, [windowSize]);

  return <div id="viewport" style={{ height: "80vh" }} ref={viewport}></div>;
}

export default Viewport;
