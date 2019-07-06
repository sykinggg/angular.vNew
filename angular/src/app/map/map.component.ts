import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { routerName: 'base', routerLink: 'base' },
        // { routerName: 'operation', routerLink: 'search' },
        { routerName: 'google', routerLink: 'google' },
        { routerName: '高德', routerLink: 'gaode' }
    ];

    constructor() { }

    ngOnInit() {

    }

}
