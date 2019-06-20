import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDisplayPositionComponent } from './css-display-position.component';

describe('CssDisplayPositionComponent', () => {
    let component: CssDisplayPositionComponent;
    let fixture: ComponentFixture<CssDisplayPositionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssDisplayPositionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssDisplayPositionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
