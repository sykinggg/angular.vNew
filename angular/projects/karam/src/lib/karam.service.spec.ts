import { TestBed, inject } from '@angular/core/testing';

import { KaramService } from './karam.service';

describe('KaramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KaramService]
    });
  });

  it('should be created', inject([KaramService], (service: KaramService) => {
    expect(service).toBeTruthy();
  }));
});
