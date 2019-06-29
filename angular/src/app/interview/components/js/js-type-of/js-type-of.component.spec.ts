import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTypeOfComponent } from './js-type-of.component';

describe('JsTypeOfComponent', () => {
    let component: JsTypeOfComponent;
    let fixture: ComponentFixture<JsTypeOfComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsTypeOfComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsTypeOfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
