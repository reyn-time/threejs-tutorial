import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { MESH, MeshProvider } from './animate';

@Component({
  selector: 'app-cube',
  template: '<div appMesh></div>',
  providers: [{provide: MESH, useExisting: forwardRef(() => CubeComponent)}]
})
export class CubeComponent implements OnChanges, MeshProvider {
  @Input() color = '#44aa88';
  @Input() position = {x: 0, y: 0, z: 0};
  @Input() rotation = {x: 0, y: 0, z: 0};

  public cube: Mesh<BoxGeometry, MeshPhongMaterial>;

  constructor() {
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial({color: this.color})
    this.cube = new Mesh(geometry, material);
    this.setPosition();
    this.setRotation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color && changes.color.currentValue) {
      this.cube.material.color.set(this.color);
    }

    if (changes.position && changes.position.currentValue) {
      this.setPosition();
    }

    if (changes.rotation && changes.rotation.currentValue) {
      this.setRotation();
    }
  }

  getMesh(): Mesh {
    return this.cube;
  }

  private setPosition(): void {
    this.cube.position.set(this.position.x, this.position.y, this.position.z);
  }

  private setRotation(): void {
    this.cube.rotation.x = this.rotation.x;
    this.cube.rotation.y = this.rotation.y;
    this.cube.rotation.z = this.rotation.z;
  }
}
