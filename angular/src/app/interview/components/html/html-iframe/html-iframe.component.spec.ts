import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlIframeComponent } from './html-iframe.component';

describe('HtmlIframeComponent', () => {
    let component: HtmlIframeComponent;
    let fixture: ComponentFixture<HtmlIframeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlIframeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlIframeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
