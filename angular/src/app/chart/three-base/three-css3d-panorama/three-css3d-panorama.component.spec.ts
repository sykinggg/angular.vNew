import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCss3dPanoramaComponent } from './three-css3d-panorama.component';

describe('ThreeCss3dPanoramaComponent', () => {
  let component: ThreeCss3dPanoramaComponent;
  let fixture: ComponentFixture<ThreeCss3dPanoramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeCss3dPanoramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeCss3dPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
