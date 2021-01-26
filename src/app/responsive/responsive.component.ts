import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebGLRenderer } from 'three';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css'],
})
export class ResponsiveComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private renderer = new WebGLRenderer();

  constructor() {}

  ngOnInit(): void {}
}
