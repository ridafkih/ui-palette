import { 
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer
} from "three";

export default class ThreeJSRenderer extends WebGLRenderer {
  scene!: Scene;
  camera: PerspectiveCamera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  constructor(scene: Scene, {
    width = window.innerWidth,
    height = window.innerHeight,
    ...props
  }) {
    super({ ...props });
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(scene.position);
    
    this.scene = scene;
    this.outputEncoding = sRGBEncoding;
    this.setClearColor(0x000000, 0);

    this.setSize(width, height);

    window.addEventListener("resize", () => handleResize(this), false);
  }
}

function handleResize(renderer: ThreeJSRenderer) {
  renderer.camera.aspect = window.innerWidth / window.innerHeight;
  renderer.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
