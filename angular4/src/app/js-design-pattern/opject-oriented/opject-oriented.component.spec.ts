import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpjectOrientedComponent } from './opject-oriented.component';

describe('OpjectOrientedComponent', () => {
  let component: OpjectOrientedComponent;
  let fixture: ComponentFixture<OpjectOrientedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpjectOrientedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpjectOrientedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
