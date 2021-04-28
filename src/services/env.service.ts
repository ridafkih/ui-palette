import { PMREMGenerator, UnsignedByteType } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import ThreeJSRenderer from "./renderer.service";

export const setEnvironmentMap = (
  renderer: ThreeJSRenderer,
  envMapPath: string
) => {
  const pmremGenerator: PMREMGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  new RGBELoader().setDataType(UnsignedByteType).load(envMapPath, (data) => {
    const { texture } = pmremGenerator.fromEquirectangular(data);
    pmremGenerator.dispose();
    renderer.scene.environment = texture;
  });
};
