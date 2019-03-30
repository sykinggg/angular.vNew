import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEmbedComponent } from './pdf-embed.component';

describe('PdfEmbedComponent', () => {
    let component: PdfEmbedComponent;
    let fixture: ComponentFixture<PdfEmbedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdfEmbedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdfEmbedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
