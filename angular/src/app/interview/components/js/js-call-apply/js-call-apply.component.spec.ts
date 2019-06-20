import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCallApplyComponent } from './js-call-apply.component';

describe('JsCallApplyComponent', () => {
    let component: JsCallApplyComponent;
    let fixture: ComponentFixture<JsCallApplyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsCallApplyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsCallApplyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
