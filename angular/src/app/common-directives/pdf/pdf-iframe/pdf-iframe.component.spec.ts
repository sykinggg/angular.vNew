import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfIframeComponent } from './pdf-iframe.component';

describe('PdfIframeComponent', () => {
    let component: PdfIframeComponent;
    let fixture: ComponentFixture<PdfIframeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdfIframeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdfIframeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
