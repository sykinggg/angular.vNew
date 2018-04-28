import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveExplainComponent } from './directive-explain.component';

describe('DirectiveExplainComponent', () => {
  let component: DirectiveExplainComponent;
  let fixture: ComponentFixture<DirectiveExplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveExplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveExplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
