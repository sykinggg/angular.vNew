import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewBaseComponent } from './interview-base.component';

describe('InterviewBaseComponent', () => {
    let component: InterviewBaseComponent;
    let fixture: ComponentFixture<InterviewBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewBaseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
