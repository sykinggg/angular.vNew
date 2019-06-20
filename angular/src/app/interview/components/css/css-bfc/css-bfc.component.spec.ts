import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssBFCComponent } from './css-bfc.component';

describe('CssBFCComponent', () => {
    let component: CssBFCComponent;
    let fixture: ComponentFixture<CssBFCComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssBFCComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssBFCComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
