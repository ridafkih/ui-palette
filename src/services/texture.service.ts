import { CanvasTexture, Mesh, Object3D, sRGBEncoding, Texture, TextureLoader } from "three";

const textureLoader: TextureLoader = new TextureLoader();

export const loadTexture = (path: string): Promise<Texture> => {
  return new Promise((resolve, reject) => {
    textureLoader.load(path, resolve, undefined, reject);
  });
};

export const loadCanvasTexture = (canvas: HTMLCanvasElement): CanvasTexture => {
  const context = canvas.getContext("2d");
  const texture = new CanvasTexture(context!.canvas);
  texture.encoding = sRGBEncoding;
  return texture;
};

export const applyTextureToChild = (
  object: Object3D,
  childName: string,
  texture: Texture
) => {
  object.traverse((object) => {
    if (object.name === childName && object instanceof Mesh) {
      object.material.map = texture;
    }
  });
};
