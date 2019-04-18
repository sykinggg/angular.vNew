import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsSummarySumComponent } from './js-summary-sum.component';

describe('JsSummarySumComponent', () => {
    let component: JsSummarySumComponent;
    let fixture: ComponentFixture<JsSummarySumComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsSummarySumComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsSummarySumComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
