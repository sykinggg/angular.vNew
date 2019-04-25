import { Component, OnInit } from '@angular/core';

import { Css3dOrthographicService, Css3dPanoramaService } from '../threeExample';

@Component({
    selector: 'app-three',
    templateUrl: './three.component.html',
    styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

    public three: any = {};

    public threeOption: any = [
        {
            type: 'css3dOrthographi'
        },
        {
            type: 'css3dPanorama'
        },
        {
            type: 'css3dPeriodictable'
        }
    ];
    public choiceOption: any = [];

    constructor(
        public css3dOrthographicService: Css3dOrthographicService,
        public css3dPanoramaService: Css3dPanoramaService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        // const threeContainer = {
        //     elem: document.getElementsByClassName('threeContainer')[0],
        //     width: 1100,
        //     height: 550
        // };

        // three base
        // this.threeServiceService.defaultBase(threeContainer);
        // this.threeServiceService.createBox();
        // window['requestAnimFrame'](this.threeServiceService.defaultThree.bind(this));


        // css3d_orthographic
        // this.css3dOrthographicService.init(threeContainer);
        // this.css3dOrthographicService.animate();


        // css3d_panorama
        // setTimeout(() => {
        //     this.css3dPanoramaService.init(threeContainer);
        //     this.css3dPanoramaService.animate();
        // })
    }

    public outPutChangeData(item: any) {
        console.log(item);
        this.choiceOption = [
            {
                type: item.type,
            }
        ]
    }

}
