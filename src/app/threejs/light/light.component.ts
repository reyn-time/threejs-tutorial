import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DirectionalLight } from 'three';
import { BaseScene } from '../scene/base-scene';

@Component({
  selector: 'app-light',
  template: '<div></div>'
})
export class LightComponent implements OnChanges {
  @Input() color = '#ffffff';
  @Input() intensity = 1;
  @Input() position = {x: -1, y: 2, z: 4};

  public light: DirectionalLight;

  constructor(private readonly scene: BaseScene) {
    this.light = new DirectionalLight(this.color, this.intensity);
    this.light.position.set(this.position.x, this.position.y, this.position.z);
    this.scene.scene.add(this.light);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color && changes.color.currentValue) {
      this.light.color.set(this.color);
    }

    if (changes.intensity && changes.intensity.currentValue) {
      this.light.intensity = this.intensity;
    }

    if (changes.position && changes.position.currentValue) {
      this.light.position.set(this.position.x, this.position.y, this.position.z);
    }
  }
}
