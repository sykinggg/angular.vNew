import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsArrDeWeightingComponent } from './js-arr-de-weighting.component';

describe('JsArrDeWeightingComponent', () => {
    let component: JsArrDeWeightingComponent;
    let fixture: ComponentFixture<JsArrDeWeightingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsArrDeWeightingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsArrDeWeightingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
