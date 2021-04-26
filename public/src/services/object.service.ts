import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gltfLoader: GLTFLoader = new GLTFLoader();

export const loadObject = (path: string): Promise<Object3D> => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      ({ scene: model }) => {
        resolve(model);
      },
      undefined,
      reject
    );
  });
};
