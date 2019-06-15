import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewContainerChoiceComponent } from './interview-container-choice.component';

describe('InterviewContainerChoiceComponent', () => {
    let component: InterviewContainerChoiceComponent;
    let fixture: ComponentFixture<InterviewContainerChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewContainerChoiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewContainerChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
