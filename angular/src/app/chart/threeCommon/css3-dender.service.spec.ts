import { TestBed } from '@angular/core/testing';

import { Css3DenderService } from './css3-dender.service';

describe('Css3DenderService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: Css3DenderService = TestBed.get(Css3DenderService);
        expect(service).toBeTruthy();
    });
});
