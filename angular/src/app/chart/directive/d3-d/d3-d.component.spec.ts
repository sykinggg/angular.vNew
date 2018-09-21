import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3DComponent } from './d3-d.component';

describe('D3DComponent', () => {
  let component: D3DComponent;
  let fixture: ComponentFixture<D3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
