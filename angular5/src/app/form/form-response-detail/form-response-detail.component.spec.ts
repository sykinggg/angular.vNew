import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponseDetailComponent } from './form-response-detail.component';

describe('FormResponseDetailComponent', () => {
  let component: FormResponseDetailComponent;
  let fixture: ComponentFixture<FormResponseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResponseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
