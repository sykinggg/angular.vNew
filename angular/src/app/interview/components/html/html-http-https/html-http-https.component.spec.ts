import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlHttpHttpsComponent } from './html-http-https.component';

describe('HtmlHttpHttpsComponent', () => {
  let component: HtmlHttpHttpsComponent;
  let fixture: ComponentFixture<HtmlHttpHttpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlHttpHttpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlHttpHttpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
