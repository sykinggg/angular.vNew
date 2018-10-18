import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFullComponent } from './water-full.component';

describe('WaterFullComponent', () => {
  let component: WaterFullComponent;
  let fixture: ComponentFixture<WaterFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
