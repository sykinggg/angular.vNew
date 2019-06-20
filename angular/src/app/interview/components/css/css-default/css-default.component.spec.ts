import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDefaultComponent } from './css-default.component';

describe('CssDefaultComponent', () => {
    let component: CssDefaultComponent;
    let fixture: ComponentFixture<CssDefaultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssDefaultComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssDefaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
