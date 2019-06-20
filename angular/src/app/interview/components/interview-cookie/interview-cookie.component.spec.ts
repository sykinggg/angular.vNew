import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCookieComponent } from './interview-cookie.component';

describe('InterviewCookieComponent', () => {
    let component: InterviewCookieComponent;
    let fixture: ComponentFixture<InterviewCookieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewCookieComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewCookieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
