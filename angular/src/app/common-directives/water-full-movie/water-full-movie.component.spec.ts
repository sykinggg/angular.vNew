import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFullMovieComponent } from './water-full-movie.component';

describe('WaterFullMovieComponent', () => {
  let component: WaterFullMovieComponent;
  let fixture: ComponentFixture<WaterFullMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterFullMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterFullMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
