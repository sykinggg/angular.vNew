import { Component, OnInit } from '@angular/core';
import { stateStyle } from '../../animation/state';
import { flyInOut } from '../../animation/flyInOut';

@Component({
    selector: 'app-animations',
    templateUrl: './animations.component.html',
    styleUrls: ['./animations.component.scss'],
    animations: [stateStyle, flyInOut]
})
export class AnimationsComponent implements OnInit {

    private stateContent: any = {
        name: 'name',
        state: 'inactive'
    }

    change() {
        if (this.stateContent.state == 'inactive') {
            this.stateContent.state = 'active';
        } else {
            this.stateContent.state = 'inactive';
        }
    }

    private flyInOutInspect:Boolean = true;

    hide() {
        this.flyInOutInspect = !this.flyInOutInspect;
    }

    constructor() { }

    ngOnInit() {
    }

}
