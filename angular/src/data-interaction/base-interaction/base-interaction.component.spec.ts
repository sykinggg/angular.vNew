import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInteractionComponent } from './base-interaction.component';

describe('BaseInteractionComponent', () => {
  let component: BaseInteractionComponent;
  let fixture: ComponentFixture<BaseInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
