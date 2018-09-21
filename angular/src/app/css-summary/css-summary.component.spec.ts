import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssSummaryComponent } from './css-summary.component';

describe('CssSummaryComponent', () => {
  let component: CssSummaryComponent;
  let fixture: ComponentFixture<CssSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
