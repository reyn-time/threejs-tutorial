import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { BaseRendererComponent } from './responsive/base-renderer/base-renderer.component';

@NgModule({
  declarations: [AppComponent, ResponsiveComponent, BaseRendererComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
