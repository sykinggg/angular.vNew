import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDirectiveComponent } from './common-directive.component';

describe('CommonDirectiveComponent', () => {
  let component: CommonDirectiveComponent;
  let fixture: ComponentFixture<CommonDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
