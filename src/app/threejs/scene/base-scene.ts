import { Scene } from 'three';
import { MeshDirective } from '../mesh/mesh.directive';

export abstract class BaseScene {
  public scene: Scene = new Scene();
  public meshes: Array<MeshDirective> = [];
}
