import { Component, forwardRef } from '@angular/core';
import { BaseScene } from '../threejs/scene/base-scene';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
,  providers: [{provide: BaseScene, useExisting: forwardRef(() => ResponsiveComponent)}]
})
export class ResponsiveComponent extends BaseScene {
  constructor() { super() }
}
