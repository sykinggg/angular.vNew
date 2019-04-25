import { TestBed } from '@angular/core/testing';

import { TrackballControlsService } from './trackball-controls.service';

describe('TrackballControlsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TrackballControlsService = TestBed.get(TrackballControlsService);
        expect(service).toBeTruthy();
    });
});
