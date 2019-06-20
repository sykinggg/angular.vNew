import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCrossDomainComponent } from './js-cross-domain.component';

describe('JsCrossDomainComponent', () => {
    let component: JsCrossDomainComponent;
    let fixture: ComponentFixture<JsCrossDomainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsCrossDomainComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsCrossDomainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
