import { TestBed } from '@angular/core/testing';

import { Css3dOrthographicService } from './css3d-orthographic.service';

describe('Css3dOrthographicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Css3dOrthographicService = TestBed.get(Css3dOrthographicService);
    expect(service).toBeTruthy();
  });
});
