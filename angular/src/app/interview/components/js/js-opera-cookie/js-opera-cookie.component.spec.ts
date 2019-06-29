import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsOperaCookieComponent } from './js-opera-cookie.component';

describe('JsOperaCookieComponent', () => {
    let component: JsOperaCookieComponent;
    let fixture: ComponentFixture<JsOperaCookieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsOperaCookieComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsOperaCookieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
