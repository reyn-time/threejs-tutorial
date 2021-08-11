import { Component } from '@angular/core';
import { interval } from 'rxjs';
import {map} from 'rxjs/operators'
@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
})
export class ResponsiveComponent {
  public rotations$ = interval(50).pipe(
    map(step => [0, 1, 2].map(i => {
      const speed = 1 + i * .1;
      const time = step * 50 / 1000;
      const rotation = time * speed;
      return {x: rotation, y: rotation, z: 0}
    }))
  )

  constructor() {}
}
