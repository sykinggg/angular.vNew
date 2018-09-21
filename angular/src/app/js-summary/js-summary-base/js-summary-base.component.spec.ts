import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsSummaryBaseComponent } from './js-summary-base.component';

describe('JsSummaryBaseComponent', () => {
  let component: JsSummaryBaseComponent;
  let fixture: ComponentFixture<JsSummaryBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsSummaryBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsSummaryBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
