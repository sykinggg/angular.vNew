import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssBoxComponent } from './css-box.component';

describe('CssBoxComponent', () => {
    let component: CssBoxComponent;
    let fixture: ComponentFixture<CssBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssBoxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
