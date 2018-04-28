import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsDesignPatternComponent } from './js-design-pattern.component';

describe('JsDesignPatternComponent', () => {
  let component: JsDesignPatternComponent;
  let fixture: ComponentFixture<JsDesignPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsDesignPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsDesignPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
