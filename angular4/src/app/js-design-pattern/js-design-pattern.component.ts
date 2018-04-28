import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-js-design-pattern',
    templateUrl: './js-design-pattern.component.html',
    styleUrls: ['./js-design-pattern.component.scss']
})
export class JsDesignPatternComponent implements OnInit {

    constructor() { }

    routerLinkArr: Array<any> = [
        { router: '/home/JsDPRoutes/OpjectOriented', name: '面向对象' }
    ]

    ngOnInit() {
    }

}
