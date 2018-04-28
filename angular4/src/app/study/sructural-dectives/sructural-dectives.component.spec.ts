import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SructuralDectivesComponent } from './sructural-dectives.component';

describe('SructuralDectivesComponent', () => {
  let component: SructuralDectivesComponent;
  let fixture: ComponentFixture<SructuralDectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SructuralDectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SructuralDectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
