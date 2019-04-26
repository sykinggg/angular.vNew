import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssSpecialComponent } from './css-special.component';

describe('CssSpecialComponent', () => {
    let component: CssSpecialComponent;
    let fixture: ComponentFixture<CssSpecialComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssSpecialComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssSpecialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
