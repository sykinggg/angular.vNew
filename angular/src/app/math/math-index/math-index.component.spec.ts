import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathIndexComponent } from './math-index.component';

describe('MathIndexComponent', () => {
    let component: MathIndexComponent;
    let fixture: ComponentFixture<MathIndexComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MathIndexComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MathIndexComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
