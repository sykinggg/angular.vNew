import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsProcessAndThreadComponent } from './js-process-and-thread.component';

describe('JsProcessAndThreadComponent', () => {
    let component: JsProcessAndThreadComponent;
    let fixture: ComponentFixture<JsProcessAndThreadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsProcessAndThreadComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsProcessAndThreadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
