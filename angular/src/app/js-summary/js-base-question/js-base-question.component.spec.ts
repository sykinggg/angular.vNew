import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsBaseQuestionComponent } from './js-base-question.component';

describe('JsBaseQuestionComponent', () => {
    let component: JsBaseQuestionComponent;
    let fixture: ComponentFixture<JsBaseQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsBaseQuestionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsBaseQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
