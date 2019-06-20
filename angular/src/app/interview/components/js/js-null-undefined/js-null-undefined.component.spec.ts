import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsNullUndefinedComponent } from './js-null-undefined.component';

describe('JsNullUndefinedComponent', () => {
    let component: JsNullUndefinedComponent;
    let fixture: ComponentFixture<JsNullUndefinedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsNullUndefinedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsNullUndefinedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
