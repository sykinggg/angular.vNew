import { TestBed, inject } from '@angular/core/testing';

import { ComponentInteractionService } from './component-interaction.service';

describe('ComponentInteractionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentInteractionService]
    });
  });

  it('should be created', inject([ComponentInteractionService], (service: ComponentInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
