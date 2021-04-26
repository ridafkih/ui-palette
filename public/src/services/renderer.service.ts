import { sRGBEncoding, WebGLRenderer } from "three";

export default class ThreeJSRenderer extends WebGLRenderer {
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    ...props
  }) {
    super({ ...props });

    this.outputEncoding = sRGBEncoding;
    this.setClearColor(0x000000, 0);

    this.setSize(width, height);
  }
}
