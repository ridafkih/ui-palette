import { 
  Mesh,
  Object3D,
  Texture,
  TextureLoader
} from "three";

const textureLoader: TextureLoader = new TextureLoader();

export const loadTexture = (path: string): Promise<Texture> => {
  return new Promise((resolve, reject) => {
    textureLoader.load(path, resolve, undefined, reject);
  });
};

export const applyTextureToChild = (
  object: Object3D,
  childName: string,
  texturePath: string
) => {
  object.traverse(object => {
    if (object.name === childName && object instanceof Mesh)
    loadTexture(texturePath).then(texture => {
      object.material.map = texture;
    })
  })
}
