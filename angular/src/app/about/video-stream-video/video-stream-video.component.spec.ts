import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamVideoComponent } from './video-stream-video.component';

describe('VideoStreamVideoComponent', () => {
    let component: VideoStreamVideoComponent;
    let fixture: ComponentFixture<VideoStreamVideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VideoStreamVideoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoStreamVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
