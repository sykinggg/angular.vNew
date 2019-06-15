import { TestBed } from '@angular/core/testing';

import { InterviewContainerService } from './interview-container.service';

describe('InterviewContainerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: InterviewContainerService = TestBed.get(InterviewContainerService);
        expect(service).toBeTruthy();
    });
});
