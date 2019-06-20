import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssSpritesComponent } from './css-sprites.component';

describe('CssSpritesComponent', () => {
    let component: CssSpritesComponent;
    let fixture: ComponentFixture<CssSpritesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssSpritesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssSpritesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
