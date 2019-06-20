import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5NewFeaturesComponent } from './html5-new-features.component';

describe('Html5NewFeaturesComponent', () => {
    let component: Html5NewFeaturesComponent;
    let fixture: ComponentFixture<Html5NewFeaturesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Html5NewFeaturesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Html5NewFeaturesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
