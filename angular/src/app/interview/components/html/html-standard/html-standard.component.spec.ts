import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlStandardComponent } from './html-standard.component';

describe('HtmlStandardComponent', () => {
    let component: HtmlStandardComponent;
    let fixture: ComponentFixture<HtmlStandardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlStandardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
