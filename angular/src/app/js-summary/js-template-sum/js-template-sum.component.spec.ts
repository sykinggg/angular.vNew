import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTemplateSumComponent } from './js-template-sum.component';

describe('JsTemplateSumComponent', () => {
    let component: JsTemplateSumComponent;
    let fixture: ComponentFixture<JsTemplateSumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsTemplateSumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsTemplateSumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
