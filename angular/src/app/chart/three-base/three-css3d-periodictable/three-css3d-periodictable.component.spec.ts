import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCss3dPeriodictableComponent } from './three-css3d-periodictable.component';

describe('ThreeCss3dPeriodictableComponent', () => {
    let component: ThreeCss3dPeriodictableComponent;
    let fixture: ComponentFixture<ThreeCss3dPeriodictableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThreeCss3dPeriodictableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreeCss3dPeriodictableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
