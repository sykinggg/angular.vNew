import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInteractionComponent } from './data-interaction.component';

describe('DataInteractionComponent', () => {
  let component: DataInteractionComponent;
  let fixture: ComponentFixture<DataInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
