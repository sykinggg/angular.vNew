import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInstanceComponent } from './component-instance.component';

describe('ComponentInstanceComponent', () => {
  let component: ComponentInstanceComponent;
  let fixture: ComponentFixture<ComponentInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
