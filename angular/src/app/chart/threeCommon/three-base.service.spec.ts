import { TestBed } from '@angular/core/testing';

import { ThreeBaseService } from './three-base.service';

describe('ThreeBaseService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ThreeBaseService = TestBed.get(ThreeBaseService);
        expect(service).toBeTruthy();
    });
});
