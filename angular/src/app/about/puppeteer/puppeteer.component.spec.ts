import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppeteerComponent } from './puppeteer.component';

describe('PuppeteerComponent', () => {
  let component: PuppeteerComponent;
  let fixture: ComponentFixture<PuppeteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuppeteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuppeteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
