import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuobiComponent } from './huobi.component';

describe('HuobiComponent', () => {
  let component: HuobiComponent;
  let fixture: ComponentFixture<HuobiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuobiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuobiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
