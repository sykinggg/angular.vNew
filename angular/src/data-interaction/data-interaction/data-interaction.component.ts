import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data-interaction',
    templateUrl: './data-interaction.component.html',
    styleUrls: ['./data-interaction.component.scss']
})
export class DataInteractionComponent implements OnInit {

    public routerLinkArr: Array<any>;

    constructor() {
        this.routerLinkArr = [
            { routerName: 'base-interaction', routerLink: 'baseInteraction' }
        ]
    }

    ngOnInit() {
    }

}
