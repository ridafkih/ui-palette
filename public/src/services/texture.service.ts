import { Texture, TextureLoader } from "three";

const textureLoader: TextureLoader = new TextureLoader();

export const loadTexture = (path: string): Promise<Texture> => {
  return new Promise((resolve, reject) => {
    textureLoader.load(path, resolve, undefined, reject);
  })
}