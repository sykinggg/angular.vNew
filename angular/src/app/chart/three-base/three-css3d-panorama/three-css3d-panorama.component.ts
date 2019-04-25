import { Component, OnInit } from '@angular/core';
import { Css3dPanoramaService } from '../../threeExample';

@Component({
    selector: 'app-three-css3d-panorama',
    templateUrl: './three-css3d-panorama.component.html',
    styleUrls: ['./three-css3d-panorama.component.scss']
})
export class ThreeCss3dPanoramaComponent implements OnInit {

    constructor(
        public css3dPanoramaService: Css3dPanoramaService
    ) { }

    private default() {
        const threeContainer = {
            elem: document.getElementsByClassName('threeContainer')[0],
            width: 1100,
            height: 480
        };
        this.css3dPanoramaService.init(threeContainer);
        this.css3dPanoramaService.animate();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.default();
    }

}
