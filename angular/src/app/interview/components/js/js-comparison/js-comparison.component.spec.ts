import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsComparisonComponent } from './js-comparison.component';

describe('JsComparisonComponent', () => {
    let component: JsComparisonComponent;
    let fixture: ComponentFixture<JsComparisonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsComparisonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsComparisonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
