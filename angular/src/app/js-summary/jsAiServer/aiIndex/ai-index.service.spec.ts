import { TestBed } from '@angular/core/testing';

import { AiIndexService } from './ai-index.service';

describe('AiIndexService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AiIndexService = TestBed.get(AiIndexService);
        expect(service).toBeTruthy();
    });
});
