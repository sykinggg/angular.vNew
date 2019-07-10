import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathFirstGradeComponent } from './math-first-grade.component';

describe('MathFirstGradeComponent', () => {
    let component: MathFirstGradeComponent;
    let fixture: ComponentFixture<MathFirstGradeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MathFirstGradeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MathFirstGradeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
