import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  Object3D
} from "three";

import ThreeJSRenderer from "./services/renderer.service";

import { loadObject, ObjectStateHandler } from "./services/object.service";
import { applyTextureToChild } from "./services/texture.service";
import { setEnvironmentMap } from "./services/env.service";

// ** OBJECT STATE HANDLER

const objectStateHandler = new ObjectStateHandler();

// ** SCENE CONFIGURATION

const scene: Scene = new Scene();
scene.background = null;

const renderer: ThreeJSRenderer = new ThreeJSRenderer(scene, {
  antialias: true,
  alpha: true,
});

document.body.appendChild(renderer.domElement);

// ** CAMERA CONFIGURATION

const camera: PerspectiveCamera = renderer.camera;
camera.position.set(0, 0, 0);
camera.lookAt(scene.position);

// ** ENVIRONMENT CONFIGURATION

setEnvironmentMap(renderer, "./environments/env.pic");

// ** AMBIENT LIGHT CONFIGURATION

const ambientLight = new AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// ** POINT LIGHT

const pointLight = new PointLight(0xffffff, 0.1);
pointLight.position.set(64, 64, 0);
scene.add(pointLight);

// ** OBJECT CONFIGURATION

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

  // ** ANIMATION

  function animate() {
    requestAnimationFrame(animate);
    objectStateHandler.updateObjects();
    renderer.render(scene, camera);
  }

  animate();
})();
