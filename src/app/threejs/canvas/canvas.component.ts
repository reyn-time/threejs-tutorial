import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { BaseScene } from '../scene/base-scene';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  private camera: PerspectiveCamera;

  private renderer!: WebGLRenderer;
  @ViewChild('rendererContainer') private rendererContainer!: ElementRef;

  constructor(private readonly ngZone: NgZone, private readonly scene: BaseScene) {
    this.camera = new PerspectiveCamera(75, 2, 0.1, 5);
    this.camera.position.z = 2;
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

    this.scene.meshes.forEach(mesh => mesh.render(time));

    this.renderer.render(this.scene.scene, this.camera);

    window.requestAnimationFrame((time) => this.render(time));
  }
}
