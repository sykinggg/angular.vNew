import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsSourceOptimizationComponent } from './js-source-optimization.component';

describe('JsSourceOptimizationComponent', () => {
    let component: JsSourceOptimizationComponent;
    let fixture: ComponentFixture<JsSourceOptimizationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsSourceOptimizationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsSourceOptimizationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
