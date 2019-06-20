import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsNewComponent } from './js-new.component';

describe('JsNewComponent', () => {
    let component: JsNewComponent;
    let fixture: ComponentFixture<JsNewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsNewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
