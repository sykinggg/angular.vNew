import { TestBed } from '@angular/core/testing';

import { Css3dPanoramaService } from './css3d-panorama.service';

describe('Css3dPanoramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Css3dPanoramaService = TestBed.get(Css3dPanoramaService);
    expect(service).toBeTruthy();
  });
});
