import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponent3Component } from './dynamic-component3.component';

describe('DynamicComponent3Component', () => {
  let component: DynamicComponent3Component;
  let fixture: ComponentFixture<DynamicComponent3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicComponent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
