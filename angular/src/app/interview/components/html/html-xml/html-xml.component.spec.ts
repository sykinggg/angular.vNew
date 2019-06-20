import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlXmlComponent } from './html-xml.component';

describe('HtmlXmlComponent', () => {
    let component: HtmlXmlComponent;
    let fixture: ComponentFixture<HtmlXmlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlXmlComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlXmlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
