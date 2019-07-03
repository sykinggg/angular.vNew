import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsEventCommissionComponent } from './js-event-commission.component';

describe('JsEventCommissionComponent', () => {
    let component: JsEventCommissionComponent;
    let fixture: ComponentFixture<JsEventCommissionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsEventCommissionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsEventCommissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
