import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDomShowHideComponent } from './css-dom-show-hide.component';

describe('CssDomShowHideComponent', () => {
    let component: CssDomShowHideComponent;
    let fixture: ComponentFixture<CssDomShowHideComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssDomShowHideComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssDomShowHideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
