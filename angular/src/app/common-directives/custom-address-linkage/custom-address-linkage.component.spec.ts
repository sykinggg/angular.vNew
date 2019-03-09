import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAddressLinkageComponent } from './custom-address-linkage.component';

describe('CustomAddressLinkageComponent', () => {
    let component: CustomAddressLinkageComponent;
    let fixture: ComponentFixture<CustomAddressLinkageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomAddressLinkageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomAddressLinkageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
