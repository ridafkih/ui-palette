import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Color,
  PMREMGenerator,
  UnsignedByteType,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
  ImageBitmapLoader,
  PointLight,
  sRGBEncoding,
} from "three";

// ** SCENE CONFIGURATION

const scene: Scene = new Scene();
scene.background = new Color(0xdddddd);

const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
renderer.outputEncoding = sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

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
.setDataType( UnsignedByteType )
.load('./environments/env.pic', texture => {
  const envMap = generator.fromEquirectangular(texture).texture;
  generator.dispose();
  scene.environment = envMap;
});

// ** AMBIENT LIGHT CONFIGURATION

const ambientLight = new AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

// ** OBJECT CONFIGURATION


const state = {
  position: {
    x: 0,
    y: .25,
    z: -150
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  }
}

document.addEventListener("mousemove", ({ clientX, clientY }) => {
  const xMidRef = (clientX - (window.innerWidth / 2)) / window.innerWidth;
  const yMidRef = (clientY - (window.innerHeight / 2)) / window.innerHeight;
  
  state.rotation.y = xMidRef * .5;
  state.rotation.x = yMidRef * .5;
})

const textureLoader = new TextureLoader();
const bitmapLoader = new ImageBitmapLoader();

const gltfLoader: GLTFLoader = new GLTFLoader();
gltfLoader.load(
  "./models/iphone_12_pro/model.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    model.traverse(object => {
      if (object instanceof Mesh && object.name == "Screen_Wallpaper_0") {
        const newScreenMaterial = new MeshStandardMaterial({ ...object.material, emissiveIntensity: 0.1, metalness: 0 });
        console.log(newScreenMaterial);
        object.material = newScreenMaterial;

        textureLoader.load('./texture/home.png', texture => {
          object.material.map = texture;
        });
      }
    });

    // ** POINT LIGHT

    const pointLight = new PointLight(0xFFFFFF, 0.1);
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
  },
  undefined,
  console.error
);
