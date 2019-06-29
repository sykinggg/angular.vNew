import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsCloneComponent } from './js-clone.component';

describe('JsCloneComponent', () => {
    let component: JsCloneComponent;
    let fixture: ComponentFixture<JsCloneComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsCloneComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsCloneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
