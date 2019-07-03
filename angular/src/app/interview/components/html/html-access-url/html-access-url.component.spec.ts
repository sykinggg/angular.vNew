import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlAccessUrlComponent } from './html-access-url.component';

describe('HtmlAccessUrlComponent', () => {
    let component: HtmlAccessUrlComponent;
    let fixture: ComponentFixture<HtmlAccessUrlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlAccessUrlComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlAccessUrlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
