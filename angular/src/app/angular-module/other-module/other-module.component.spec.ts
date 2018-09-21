import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherModuleComponent } from './other-module.component';

describe('OtherModuleComponent', () => {
  let component: OtherModuleComponent;
  let fixture: ComponentFixture<OtherModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
