import {
  sRGBEncoding,
  WebGLRenderer 
} from 'three';

export default class ThreeJSRenderer {
  renderer: WebGLRenderer;

  constructor() {
    this.renderer = new WebGLRenderer();
    
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor(0x000000, 0);
    
    this.setSize();
  }

  setSize(
    width: number = window.innerWidth,
    height: number = window.innerHeight
  ) {
    this.renderer.setSize(width, height);
  }
}