import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  BoxGeometry,
  Camera,
  DirectionalLight,
  Geometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { MeshService } from '../threejs/mesh/mesh.service';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css'],
})
export class ResponsiveComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private renderer!: WebGLRenderer;

  constructor(private readonly meshService: MeshService) {}

  ngAfterViewInit() {
    this.renderer = new WebGLRenderer({
      canvas: this.rendererContainer.nativeElement,
    });
    this.animate();
  }

  private animate() {
    // camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // scene
    const scene = new Scene();

    // light
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const geometry = new BoxGeometry();

    const cubes = [
      this.makeInstance(scene, geometry, 0x44aa88, 0),
      this.makeInstance(scene, geometry, 0x8844aa, -2),
      this.makeInstance(scene, geometry, 0xaa8844, 2),
    ];

    requestAnimationFrame((time) =>
      this.render(time, cubes, this.renderer, scene, camera)
    );
  }

  private makeInstance(
    scene: Scene,
    geometry: Geometry,
    color: number,
    x: number
  ) {
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  private render(
    time: number,
    cubes: Mesh[],
    renderer: WebGLRenderer,
    scene: Scene,
    camera: Camera
  ) {
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    this.renderer.render(scene, camera);

    requestAnimationFrame((time) =>
      this.render(time, cubes, renderer, scene, camera)
    );
  }
}
