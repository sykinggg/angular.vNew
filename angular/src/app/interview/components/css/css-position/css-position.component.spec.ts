import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssPositionComponent } from './css-position.component';

describe('CssPositionComponent', () => {
    let component: CssPositionComponent;
    let fixture: ComponentFixture<CssPositionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssPositionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssPositionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
