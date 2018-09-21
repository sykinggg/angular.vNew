import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularModuleComponent } from './angular-module.component';

describe('AngularModuleComponent', () => {
  let component: AngularModuleComponent;
  let fixture: ComponentFixture<AngularModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
