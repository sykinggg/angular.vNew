import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessMixinsComponent } from './less-mixins.component';

describe('LessMixinsComponent', () => {
  let component: LessMixinsComponent;
  let fixture: ComponentFixture<LessMixinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessMixinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessMixinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
