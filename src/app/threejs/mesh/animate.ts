import { InjectionToken } from '@angular/core';
import { Mesh } from 'three';

export const ANIMATE = new InjectionToken<OnAnimate>('Animate function for mesh');

export interface OnAnimate {
  animate(time: number): void;
}

export const MESH = new InjectionToken<MeshProvider>('Mesh');

export interface MeshProvider {
  getMesh(): Mesh;
}
