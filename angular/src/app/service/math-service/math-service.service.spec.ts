import { TestBed } from '@angular/core/testing';

import { MathServiceService } from './math-service.service';

describe('MathServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathServiceService = TestBed.get(MathServiceService);
    expect(service).toBeTruthy();
  });
});
