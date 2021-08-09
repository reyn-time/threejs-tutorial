import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { CanvasComponent } from './threejs/canvas/canvas.component';
import { LightComponent } from './threejs/light/light.component';

@NgModule({
  declarations: [AppComponent, ResponsiveComponent, CanvasComponent, LightComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
