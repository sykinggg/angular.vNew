import { TestBed } from '@angular/core/testing';

import { ThreeServiceService } from './three-service.service';

describe('ThreeServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ThreeServiceService = TestBed.get(ThreeServiceService);
        expect(service).toBeTruthy();
    });
});
