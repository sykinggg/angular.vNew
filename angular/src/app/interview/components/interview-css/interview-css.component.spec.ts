import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCssComponent } from './interview-css.component';

describe('InterviewCssComponent', () => {
    let component: InterviewCssComponent;
    let fixture: ComponentFixture<InterviewCssComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewCssComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewCssComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
