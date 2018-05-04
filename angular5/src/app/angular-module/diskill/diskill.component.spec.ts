import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskillComponent } from './diskill.component';

describe('DiskillComponent', () => {
  let component: DiskillComponent;
  let fixture: ComponentFixture<DiskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
