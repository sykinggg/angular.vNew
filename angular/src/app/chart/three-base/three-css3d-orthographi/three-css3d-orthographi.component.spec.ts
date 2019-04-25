import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCss3dOrthographiComponent } from './three-css3d-orthographi.component';

describe('ThreeCss3dOrthographiComponent', () => {
    let component: ThreeCss3dOrthographiComponent;
    let fixture: ComponentFixture<ThreeCss3dOrthographiComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThreeCss3dOrthographiComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreeCss3dOrthographiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
