import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlHistoryComponent } from './html-history.component';

describe('HtmlHistoryComponent', () => {
    let component: HtmlHistoryComponent;
    let fixture: ComponentFixture<HtmlHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HtmlHistoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HtmlHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
