import { Object3D, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gltfLoader: GLTFLoader = new GLTFLoader();

export const loadObject = (
  scene: Scene,
  path: string
): Promise<Object3D> => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      ({ scene: model }) => {
        scene.add(model);
        resolve(model);
      },
      undefined,
      reject
    );
  });
};
