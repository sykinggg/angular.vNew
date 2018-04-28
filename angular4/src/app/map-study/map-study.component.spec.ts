import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStudyComponent } from './map-study.component';

describe('MapStudyComponent', () => {
  let component: MapStudyComponent;
  let fixture: ComponentFixture<MapStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
