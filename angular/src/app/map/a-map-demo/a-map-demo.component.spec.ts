import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMapDemoComponent } from './a-map-demo.component';

describe('AMapDemoComponent', () => {
    let component: AMapDemoComponent;
    let fixture: ComponentFixture<AMapDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AMapDemoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AMapDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
