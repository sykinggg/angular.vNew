import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamMusicComponent } from './video-stream-music.component';

describe('VideoStreamMusicComponent', () => {
  let component: VideoStreamMusicComponent;
  let fixture: ComponentFixture<VideoStreamMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStreamMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStreamMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
