import { Component, OnInit } from '@angular/core';
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
} from 'three';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
})
export class ResponsiveComponent implements OnInit {
  public camera: PerspectiveCamera;
  public scene: Scene;

  private cubes!: Mesh[];

  constructor() {
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 2;

    this.scene = new Scene();
  }

  ngOnInit() {
    // light
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    // cubes
    const cubeGeometry = new BoxGeometry();
    const cubeMaterials = [0x44aa88, 0x8844aa, 0xaa8844].map(
      (color) => new MeshPhongMaterial({ color })
    );
    this.cubes = cubeMaterials.map((material, index) => {
      const mesh = new Mesh(cubeGeometry, material);
      mesh.position.x = -2 + 2 * index;
      return mesh;
    });

    this.cubes.forEach((cube) => this.scene.add(cube));
  }

  public render(time: number) {
    time /= 1000;

    this.cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
  }
}
