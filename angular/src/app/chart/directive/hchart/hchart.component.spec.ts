import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HchartComponent } from './hchart.component';

describe('HchartComponent', () => {
  let component: HchartComponent;
  let fixture: ComponentFixture<HchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
