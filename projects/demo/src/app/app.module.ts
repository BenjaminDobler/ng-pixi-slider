import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgPixiSliderModule } from 'ng-pixi-slider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgPixiSliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
