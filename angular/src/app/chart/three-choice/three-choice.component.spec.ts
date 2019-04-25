import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeChoiceComponent } from './three-choice.component';

describe('ThreeChoiceComponent', () => {
    let component: ThreeChoiceComponent;
    let fixture: ComponentFixture<ThreeChoiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThreeChoiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreeChoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
