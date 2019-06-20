import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAsyncLoadComponent } from './js-async-load.component';

describe('JsAsyncLoadComponent', () => {
    let component: JsAsyncLoadComponent;
    let fixture: ComponentFixture<JsAsyncLoadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsAsyncLoadComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsAsyncLoadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
