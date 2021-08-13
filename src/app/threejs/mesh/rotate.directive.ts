import { Directive, forwardRef, Inject, Input } from '@angular/core';
import { ANIMATE, MESH, MeshProvider, OnAnimate } from './animate';

@Directive({ selector: '[rotateSpeed]' , providers: [{provide: ANIMATE, useExisting: forwardRef(() => RotateDirective)}]})
export class RotateDirective implements OnAnimate {
  @Input() rotateSpeed = 1;

  private mesh;

  constructor(@Inject(MESH) private readonly meshProvider: MeshProvider) {
    this.mesh = this.meshProvider.getMesh();
  }

  animate(time: number) {
    this.mesh.rotation.x = time / 1000 * this.rotateSpeed;
    this.mesh.rotation.y = time / 1000 * this.rotateSpeed;
  }
}
