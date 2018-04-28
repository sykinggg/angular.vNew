import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.scss']
})
export class AllTemplateComponent implements OnInit {
    routerLinkArr: Array<Object> = [
        { routerName: 'tempalte', routerLink: 'tempalte' },
        { routerName: 'interaction', routerLink: 'interaction' },
        { routerName: 'attrDir', routerLink: 'attrDir' },
        { routerName: 'strDir', routerLink: 'strDir' },
        { routerName: 'pipe', routerLink: 'pipe' },
        { routerName: 'animations', routerLink: 'animations' }
    ]

    constructor() { }

    ngOnInit() {
    }

}
