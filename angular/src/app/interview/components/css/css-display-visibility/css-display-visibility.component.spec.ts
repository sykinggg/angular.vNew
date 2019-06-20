import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDisplayVisibilityComponent } from './css-display-visibility.component';

describe('CssDisplayVisibilityComponent', () => {
    let component: CssDisplayVisibilityComponent;
    let fixture: ComponentFixture<CssDisplayVisibilityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssDisplayVisibilityComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssDisplayVisibilityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
