import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssMiddleComponent } from './css-middle.component';

describe('CssMiddleComponent', () => {
  let component: CssMiddleComponent;
  let fixture: ComponentFixture<CssMiddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
