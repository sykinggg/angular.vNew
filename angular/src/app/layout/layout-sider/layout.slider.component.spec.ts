import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSliderComponent } from './layout.slider.component';

describe('LayoutComponent', () => {
  let component: LayoutSliderComponent;
  let fixture: ComponentFixture<LayoutSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
