import { TestBed } from '@angular/core/testing';

import { AMapDefaultService } from './a-map-default.service';

describe('AMapDefaultService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AMapDefaultService = TestBed.get(AMapDefaultService);
        expect(service).toBeTruthy();
    });
});
