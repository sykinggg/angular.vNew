import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3NewFeaturesComponent } from './css3-new-features.component';

describe('Css3NewFeaturesComponent', () => {
    let component: Css3NewFeaturesComponent;
    let fixture: ComponentFixture<Css3NewFeaturesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Css3NewFeaturesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Css3NewFeaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
