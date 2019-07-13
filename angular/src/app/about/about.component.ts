import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { routerName: 'aboutIndex', routerLink: 'aboutIndex' },
        { routerName: 'aboutCreate', routerLink: 'aboutCreate' },
        { routerName: 'puppeteer', routerLink: 'puppeteer' },
        { routerName: 'webpack', routerLink: 'webpack' },
        { routerName: 'interview', routerLink: 'interview' },
        { routerName: '视频流', routerLink: 'video' },
    ]

    constructor() { }

    ngOnInit() {
    }

}
