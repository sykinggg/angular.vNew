import { Component, OnInit } from '@angular/core';
import { Css3dPeriodictableService } from '../../threeExample';

@Component({
    selector: 'app-three-css3d-periodictable',
    templateUrl: './three-css3d-periodictable.component.html',
    styleUrls: ['./three-css3d-periodictable.component.scss']
})
export class ThreeCss3dPeriodictableComponent implements OnInit {

    constructor(
        public css3dPeriodictableService: Css3dPeriodictableService,
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const threeContainer = {
            elem: document.getElementsByClassName('threeContainer')[0],
            width: 1100,
            height: 480
        };

        this.css3dPeriodictableService.init(threeContainer);
        this.css3dPeriodictableService.animate();
    }

}
