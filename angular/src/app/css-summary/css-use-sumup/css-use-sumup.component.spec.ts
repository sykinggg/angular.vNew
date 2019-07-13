import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssUseSumupComponent } from './css-use-sumup.component';

describe('CssUseSumupComponent', () => {
    let component: CssUseSumupComponent;
    let fixture: ComponentFixture<CssUseSumupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssUseSumupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssUseSumupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
