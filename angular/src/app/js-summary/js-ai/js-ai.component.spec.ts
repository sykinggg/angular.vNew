import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAiComponent } from './js-ai.component';

describe('JsAiComponent', () => {
    let component: JsAiComponent;
    let fixture: ComponentFixture<JsAiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsAiComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsAiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
