import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualCombatComponent } from './actual-combat.component';

describe('ActualCombatComponent', () => {
  let component: ActualCombatComponent;
  let fixture: ComponentFixture<ActualCombatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualCombatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
