import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsClosuresComponent } from './js-closures.component';

describe('JsClosuresComponent', () => {
    let component: JsClosuresComponent;
    let fixture: ComponentFixture<JsClosuresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsClosuresComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsClosuresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
