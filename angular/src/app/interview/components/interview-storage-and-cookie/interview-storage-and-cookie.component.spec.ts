import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStorageAndCookieComponent } from './interview-storage-and-cookie.component';

describe('InterviewStorageAndCookieComponent', () => {
    let component: InterviewStorageAndCookieComponent;
    let fixture: ComponentFixture<InterviewStorageAndCookieComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewStorageAndCookieComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewStorageAndCookieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
