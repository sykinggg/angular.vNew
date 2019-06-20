import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewHtmlComponent } from './interview-html.component';

describe('InterviewHtmlComponent', () => {
    let component: InterviewHtmlComponent;
    let fixture: ComponentFixture<InterviewHtmlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewHtmlComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewHtmlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
