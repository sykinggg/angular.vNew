import { TestBed, inject } from '@angular/core/testing';

import { RouterNameService } from './router-name.service';

describe('RouterNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterNameService]
    });
  });

  it('should ...', inject([RouterNameService], (service: RouterNameService) => {
    expect(service).toBeTruthy();
  }));
});
