import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudyComponent } from './ui-study.component';

describe('UiStudyComponent', () => {
  let component: UiStudyComponent;
  let fixture: ComponentFixture<UiStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
