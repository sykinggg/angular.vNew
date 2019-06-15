import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewContainerComponent } from './interview-container.component';

describe('InterviewContainerComponent', () => {
    let component: InterviewContainerComponent;
    let fixture: ComponentFixture<InterviewContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
