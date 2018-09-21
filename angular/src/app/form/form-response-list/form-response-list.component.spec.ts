import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponseListComponent } from './form-response-list.component';

describe('FormResponseListComponent', () => {
  let component: FormResponseListComponent;
  let fixture: ComponentFixture<FormResponseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResponseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
