import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignExchangeAboutComponent } from './foreign-exchange-about.component';

describe('ForeignExchangeAboutComponent', () => {
  let component: ForeignExchangeAboutComponent;
  let fixture: ComponentFixture<ForeignExchangeAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignExchangeAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignExchangeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
