import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-js-algorithm',
    templateUrl: './js-algorithm.component.html',
    styleUrls: ['./js-algorithm.component.scss']
})
export class JsAlgorithmComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { router: '/JsAlgorithm/algorithm', name: '基础算法' }
    ]

    constructor() { }

    ngOnInit() {
    }

}
