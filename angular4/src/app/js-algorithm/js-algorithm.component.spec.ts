import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsAlgorithmComponent } from './js-algorithm.component';

describe('JsAlgorithmComponent', () => {
  let component: JsAlgorithmComponent;
  let fixture: ComponentFixture<JsAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
