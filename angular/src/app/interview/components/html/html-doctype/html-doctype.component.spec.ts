import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlDoctypeComponent } from './html-doctype.component';

describe('HtmlDoctypeComponent', () => {
    let component: HtmlDoctypeComponent;
    let fixture: ComponentFixture<HtmlDoctypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlDoctypeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlDoctypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
