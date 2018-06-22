import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropFrameComponent } from './drag-drop-frame.component';

describe('DragDropFrameComponent', () => {
  let component: DragDropFrameComponent;
  let fixture: ComponentFixture<DragDropFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
