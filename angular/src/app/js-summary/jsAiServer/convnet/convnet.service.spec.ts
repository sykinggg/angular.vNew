import { TestBed } from '@angular/core/testing';

import { ConvnetService } from './convnet.service';

describe('ConvnetService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ConvnetService = TestBed.get(ConvnetService);
        expect(service).toBeTruthy();
    });
});
