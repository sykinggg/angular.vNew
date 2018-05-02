import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyPatternComponent } from './dependency-pattern.component';

describe('DependencyPatternComponent', () => {
  let component: DependencyPatternComponent;
  let fixture: ComponentFixture<DependencyPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
