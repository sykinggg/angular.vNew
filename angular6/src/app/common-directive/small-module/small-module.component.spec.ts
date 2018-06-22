import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallModuleComponent } from './small-module.component';

describe('SmallModuleComponent', () => {
  let component: SmallModuleComponent;
  let fixture: ComponentFixture<SmallModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
