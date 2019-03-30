import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfObjectComponent } from './pdf-object.component';

describe('PdfObjectComponent', () => {
    let component: PdfObjectComponent;
    let fixture: ComponentFixture<PdfObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdfObjectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdfObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
