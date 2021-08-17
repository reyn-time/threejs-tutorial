import { Directive, Inject, OnDestroy, Optional } from '@angular/core';
import { Mesh } from 'three';
import { BaseScene } from '../scene/base-scene';
import { ANIMATE, MESH, MeshProvider, OnAnimate } from './animate';

@Directive({
  selector: '[appMesh]'
})
export class MeshDirective implements OnDestroy {
  private mesh: Mesh;

  constructor(private readonly scene: BaseScene, @Inject(MESH) private readonly meshProvider: MeshProvider, @Optional() @Inject(ANIMATE) private readonly animate: OnAnimate | null) {
    this.scene.meshes.push(this);
    this.mesh = this.meshProvider.getMesh();
    this.scene.scene.add(this.mesh);
  }

  public render(time: number): void {
    if (this.animate) {
      this.animate.animate(time);
    }
  }

  public ngOnDestroy(): void {
    this.scene.meshes = this.scene.meshes.filter(x => x !== this);
    this.scene.scene.remove(this.mesh);
  }
}
