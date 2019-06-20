import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssLinkImportComponent } from './css-link-import.component';

describe('CssLinkImportComponent', () => {
    let component: CssLinkImportComponent;
    let fixture: ComponentFixture<CssLinkImportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssLinkImportComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssLinkImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
