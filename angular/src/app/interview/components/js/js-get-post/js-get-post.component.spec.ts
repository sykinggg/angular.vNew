import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsGetPostComponent } from './js-get-post.component';

describe('JsGetPostComponent', () => {
    let component: JsGetPostComponent;
    let fixture: ComponentFixture<JsGetPostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsGetPostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsGetPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
