import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsWebSocketComponent } from './js-web-socket.component';

describe('JsWebSocketComponent', () => {
    let component: JsWebSocketComponent;
    let fixture: ComponentFixture<JsWebSocketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsWebSocketComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsWebSocketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
