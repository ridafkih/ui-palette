import { Object3D, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gltfLoader: GLTFLoader = new GLTFLoader();

export class ObjectStateHandler {
  private observers: StateObserver[] = [];

  updateObjects(): void {
    this.observers.forEach((observer) => {
      const { object } = observer;
      object.position.x = observer.state.position.x;
      object.position.y = observer.state.position.y;
      object.position.z = observer.state.position.z;

      object.rotation.x = observer.state.rotation.x;
      object.rotation.y = observer.state.rotation.y;
      object.rotation.z = observer.state.rotation.z;
    });
  }

  add(object: Object3D, name: string): StateObserver {
    const observer = new StateObserver(object, name);
    this.observers.push(observer);
    return observer;
  }

  getObjectsByName(query: string) {
    return this.observers.filter(x => x.name == query);
  }
}

export class StateObserver {
  name: string;
  object: Object3D;
  state: {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
  };

  constructor(object: Object3D, name: string) {
    this.name = name || "";
    this.object = object;
    const { position, rotation } = object;

    this.state = {
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z }
    };
  }
}

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
