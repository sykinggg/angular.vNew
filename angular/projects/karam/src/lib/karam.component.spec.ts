import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaramComponent } from './karam.component';

describe('KaramComponent', () => {
  let component: KaramComponent;
  let fixture: ComponentFixture<KaramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
