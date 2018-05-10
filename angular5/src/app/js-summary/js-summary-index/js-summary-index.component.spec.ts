import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsSummaryIndexComponent } from './js-summary-index.component';

describe('JsSummaryIndexComponent', () => {
  let component: JsSummaryIndexComponent;
  let fixture: ComponentFixture<JsSummaryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsSummaryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsSummaryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
