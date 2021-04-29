import { PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

export default class ThreeJSRenderer extends WebGLRenderer {
  scene!: Scene;
  camera: PerspectiveCamera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  constructor(scene: Scene, { width = 0, height = 0, ...props }) {
    super({ ...props });
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(scene.position);

    this.scene = scene;
    this.outputEncoding = sRGBEncoding;
    this.setClearColor(0x000000, 0);
  }

  updateViewport() {
    const { parentElement } = this.domElement;
    const width = parentElement?.clientWidth || window.innerWidth;
    const height = parentElement?.clientHeight || window.innerHeight;

    this.setSize(width, height);
    this.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
