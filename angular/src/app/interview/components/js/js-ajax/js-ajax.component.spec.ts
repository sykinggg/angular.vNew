import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAjaxComponent } from './js-ajax.component';

describe('JsAjaxComponent', () => {
    let component: JsAjaxComponent;
    let fixture: ComponentFixture<JsAjaxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsAjaxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsAjaxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
