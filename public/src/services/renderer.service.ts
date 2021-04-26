import { PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer } from "three";

export default class ThreeJSRenderer extends WebGLRenderer {
  camera: PerspectiveCamera = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    .1,
    1000
  );

  constructor(scene: Scene, {
    width = window.innerWidth,
    height = window.innerHeight,
    ...props
  }) {
    super({ ...props });

    this.outputEncoding = sRGBEncoding;
    this.setClearColor(0x000000, 0);

    this.setSize(width, height);

    window.addEventListener('resize', () => handleResize(scene), false);
  }
}

function handleResize(scene: Scene) {
  scene
}
