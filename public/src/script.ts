import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  Color,
  PMREMGenerator,
  UnsignedByteType,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
  ImageBitmapLoader,
  PointLight,
  Object3D,
} from "three";
import ThreeJSRenderer from "./services/renderer.service";
import { loadObject } from "./services/object.service";
import { loadTexture } from "./services/texture.service";

// ** SCENE CONFIGURATION

const scene: Scene = new Scene();
scene.background = null;

const renderer: ThreeJSRenderer = new ThreeJSRenderer({
  antialias: true,
  alpha: true
});

document.body.appendChild(renderer.domElement);

// ** CAMERA CONFIGURATION

const camera: PerspectiveCamera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 0);
camera.lookAt(scene.position);

// ** CAMERA CONTROLS CONFIGURATION

// ** ENVIRONMENT CONFIGURATION

const generator = new PMREMGenerator(renderer);
generator.compileEquirectangularShader();

new RGBELoader()
  .setDataType(UnsignedByteType)
  .load("./environments/env.pic", (texture) => {
    const envMap = generator.fromEquirectangular(texture).texture;
    generator.dispose();
    scene.environment = envMap;
  });

// ** AMBIENT LIGHT CONFIGURATION

const ambientLight = new AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// ** OBJECT CONFIGURATION

const state = {
  position: {
    x: 0,
    y: 0.25,
    z: -150,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
};

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  const xMidRef = (clientX - window.innerWidth / 2) / window.innerWidth;
  const yMidRef = (clientY - window.innerHeight / 2) / window.innerHeight;

  state.rotation.y = xMidRef * 0.5;
  state.rotation.x = yMidRef * 0.5;
});

const textureLoader = new TextureLoader();
const bitmapLoader = new ImageBitmapLoader();

(async() => {
  const model: Object3D = await loadObject(scene, './models/iphone_12_pro/model.glb');
  const screen: Mesh = await getChildByName(model, "Screen_Wallpaper_0");

  applyTextureToChild(screen, "Screen_Wallpaper_0", "./texture/home.png");

  // ** POINT LIGHT

  const pointLight = new PointLight(0xffffff, 0.1);
  pointLight.position.set(64, 64, 0);
  scene.add(pointLight);

  // ** ANIMATION

  function animate() {
    requestAnimationFrame(animate);

    const { position, rotation } = state;

    model.position.set(position.x, position.y, position.z);
    model.rotation.set(rotation.x, rotation.y, rotation.z);

    renderer.render(scene, camera);
  }

  animate();
})();

async function getChildByName(object: Object3D, childName: string): Promise<Mesh> {
  return new Promise((resolve, reject) => {
    object.traverse(object => {
      if (object.name == childName && object instanceof Mesh)
        resolve(object);
    })
    reject("Could not find object.");
  })
}

function applyTextureToChild(
  object: Object3D,
  childName: string,
  texturePath: string
) {
  object.traverse(object => {
    if (object.name == childName && object instanceof Mesh)
    loadTexture(texturePath).then(texture => {
      object.material.map = texture;
    })
  })
}