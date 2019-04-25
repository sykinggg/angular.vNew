import { Component, OnInit } from '@angular/core';
import { Css3dOrthographicService } from '../../threeExample';

@Component({
    selector: 'app-three-css3d-orthographi',
    templateUrl: './three-css3d-orthographi.component.html',
    styleUrls: ['./three-css3d-orthographi.component.scss']
})
export class ThreeCss3dOrthographiComponent implements OnInit {

    constructor(public css3dOrthographicService: Css3dOrthographicService, ) { }

    private default() {
        const threeContainer = {
            elem: document.getElementsByClassName('threeContainer')[0],
            width: 1100,
            height: 480
        };
        this.css3dOrthographicService.init(threeContainer);
        this.css3dOrthographicService.animate();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.default();
    }

}
