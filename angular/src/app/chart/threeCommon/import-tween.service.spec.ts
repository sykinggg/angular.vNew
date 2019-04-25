import { TestBed } from '@angular/core/testing';

import { ImportTweenService } from './import-tween.service';

describe('ImportTweenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportTweenService = TestBed.get(ImportTweenService);
    expect(service).toBeTruthy();
  });
});
