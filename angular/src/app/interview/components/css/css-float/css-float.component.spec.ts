import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssFloatComponent } from './css-float.component';

describe('CssFloatComponent', () => {
    let component: CssFloatComponent;
    let fixture: ComponentFixture<CssFloatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssFloatComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssFloatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
