import { TestBed } from '@angular/core/testing';

import { NgPixiSliderService } from './ng-pixi-slider.service';

describe('NgPixiSliderService', () => {
  let service: NgPixiSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPixiSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
