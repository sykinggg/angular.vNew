import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableObjComponent } from './observable-obj.component';

describe('ObservableObjComponent', () => {
  let component: ObservableObjComponent;
  let fixture: ComponentFixture<ObservableObjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableObjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
