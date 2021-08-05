import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { CanvasComponent } from './threejs/canvas/canvas.component';

@NgModule({
  declarations: [AppComponent, ResponsiveComponent, CanvasComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
