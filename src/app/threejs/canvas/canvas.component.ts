import { AfterViewInit, Component, ElementRef, forwardRef, NgZone, Provider, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { BaseCanvas } from './base-canvas';

const canvasBinding: Provider = {
  provide: BaseCanvas,
  useExisting: forwardRef(() => CanvasComponent)
};
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [canvasBinding]
})
export class CanvasComponent extends BaseCanvas implements AfterViewInit {
  private camera: PerspectiveCamera;

  private renderer!: WebGLRenderer;
  @ViewChild('rendererContainer') private rendererContainer!: ElementRef;

  constructor(private readonly ngZone: NgZone) {
    super();
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

    this.meshes.forEach(mesh => mesh.render(time));

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame((time) => this.render(time));
  }
}
