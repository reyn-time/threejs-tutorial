import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, BoxGeometry, Mesh, MeshPhongMaterial } from 'three';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  public scene: Scene;
  private camera: PerspectiveCamera;

  private renderer!: WebGLRenderer;
  @ViewChild('rendererContainer') private rendererContainer!: ElementRef;

  constructor(private readonly ngZone: NgZone) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, 2, 0.1, 5);
    this.camera.position.z = 2;

    // light
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    // cube
    const cubeGeometry = new BoxGeometry();
    const cubeMaterials = [0x44aa88, 0x8844aa, 0xaa8844].map(
      (color) => new MeshPhongMaterial({ color })
    );
    const cubes = cubeMaterials.map((material, index) => {
      const mesh = new Mesh(cubeGeometry, material);
      mesh.position.x = -2 + 2 * index;
      return mesh;
    });
    this.scene.add(...cubes);
  }

  ngAfterViewInit() {
    this.renderer = new WebGLRenderer({
      canvas: this.rendererContainer.nativeElement,
    });

    this.ngZone.runOutsideAngular(() => {
      window.requestAnimationFrame((time) => this.render(time));
    });
  }

  private render(time: number) {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const actualWidth = canvas.clientWidth * pixelRatio;
    const actualHeight = canvas.clientHeight * pixelRatio;
    if (canvas.width !== actualWidth || canvas.height !== actualHeight) {
      this.renderer.setSize(actualWidth, actualHeight, false);
      this.camera.aspect = actualWidth / actualHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame((time) => this.render(time));
  }
}
