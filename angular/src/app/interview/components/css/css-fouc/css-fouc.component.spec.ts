import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssFOUCComponent } from './css-fouc.component';

describe('CssFOUCComponent', () => {
    let component: CssFOUCComponent;
    let fixture: ComponentFixture<CssFOUCComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CssFOUCComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CssFOUCComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
