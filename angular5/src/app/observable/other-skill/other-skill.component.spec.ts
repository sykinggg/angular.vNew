import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSkillComponent } from './other-skill.component';

describe('OtherSkillComponent', () => {
  let component: OtherSkillComponent;
  let fixture: ComponentFixture<OtherSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
