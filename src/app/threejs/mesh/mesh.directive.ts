import { Directive, Inject, OnDestroy, Optional } from '@angular/core';
import { Mesh } from 'three';
import { BaseCanvas } from '../canvas/base-canvas';
import { ANIMATE, MESH, MeshProvider, OnAnimate } from './animate';

@Directive({
  selector: '[appMesh]'
})
export class MeshDirective implements OnDestroy {
  private mesh: Mesh;

  constructor(private readonly canvas: BaseCanvas, @Inject(MESH) private readonly meshProvider: MeshProvider, @Optional() @Inject(ANIMATE) private readonly animate: OnAnimate | null) {
    this.canvas.meshes.push(this);
    this.mesh = this.meshProvider.getMesh();
    this.canvas.scene.add(this.mesh);
  }

  public render(time: number): void {
    if (this.animate) {
      this.animate.animate(time);
    }
  }

  public ngOnDestroy(): void {
    this.canvas.meshes = this.canvas.meshes.filter(x => x !== this);
    this.canvas.scene.remove(this.mesh);
  }
}
