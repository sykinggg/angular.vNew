import { TestBed } from '@angular/core/testing';

import { OrbitControlsService } from './orbit-controls.service';

describe('OrbitControlsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OrbitControlsService = TestBed.get(OrbitControlsService);
        expect(service).toBeTruthy();
    });
});
