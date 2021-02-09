import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

@Component({
  selector: 'app-base-renderer',
  templateUrl: './base-renderer.component.html',
  styleUrls: ['./base-renderer.component.css'],
})
export class BaseRendererComponent implements AfterViewInit {
  @ViewChild('rendererContainer') private rendererContainer!: ElementRef;
  @Input() scene!: Scene;
  @Input() camera!: PerspectiveCamera;
  @Output() renderStart = new EventEmitter<number>();

  private renderer!: WebGLRenderer;

  constructor() {}

  ngAfterViewInit() {
    this.renderer = new WebGLRenderer({
      canvas: this.rendererContainer.nativeElement,
    });
    window.requestAnimationFrame((time) => this.render(time));
  }

  private render(time: number) {
    this.renderStart.emit(time);

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
