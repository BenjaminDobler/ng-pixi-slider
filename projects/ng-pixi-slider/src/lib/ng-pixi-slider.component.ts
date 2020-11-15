import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {SliderApp } from './slider.app';

@Component({
  selector: 'ng-pixi-slider',
  template: ` `,
  styleUrls: ['./ng-pixi-slider.component.scss'],
})
export class NgPixiSliderComponent implements OnInit {

  @Input()
  public images: string[] = [];

  width = 0;
  height = 0;

  resized$: Subject<any> = new Subject<any>();

  app: SliderApp;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const h = entry.contentRect.height;
      const w = entry.contentRect.width;
      if (h !== this.height || w !== this.width) {
        this.width = w;
        this.height = h;
        this.resized$.next({ width: w, height: h });
      }
    });

    observer.observe(this.el.nativeElement);
  }

  ngAfterViewInit() {
    this.app = new SliderApp(this.images, this.el.nativeElement);
  }
}
