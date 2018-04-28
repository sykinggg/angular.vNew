import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-component-instance',
    templateUrl: './component-instance.component.html',
    styleUrls: ['./component-instance.component.scss']
})
export class ComponentInstanceComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { router: 'base', name: '基础组建实例' },
        {router: 'calendar', name: '日历'}
    ]

    constructor() { }

    ngOnInit() {
    }

}
