import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStorageComponent } from './interview-storage.component';

describe('InterviewStorageComponent', () => {
    let component: InterviewStorageComponent;
    let fixture: ComponentFixture<InterviewStorageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewStorageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewStorageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
