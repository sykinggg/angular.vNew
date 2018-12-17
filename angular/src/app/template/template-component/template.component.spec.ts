import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTemplateComponent } from './template.component';

describe('TemplateComponent', () => {
  let component: AllTemplateComponent;
  let fixture: ComponentFixture<AllTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
