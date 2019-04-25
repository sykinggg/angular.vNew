import { TestBed } from '@angular/core/testing';

import { Css3dPeriodictableService } from './css3d-periodictable.service';

describe('Css3dPeriodictableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Css3dPeriodictableService = TestBed.get(Css3dPeriodictableService);
    expect(service).toBeTruthy();
  });
});
