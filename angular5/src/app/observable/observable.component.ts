import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-observable',
    templateUrl: './observable.component.html',
    styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
    
    routerLinkArr: Array<any> = [
        { routerName: 'subscriber', routerLink: 'subscriber' },
        { routerName: 'RxJs', routerLink: 'RxJs' },
        { routerName: 'observableObj', routerLink: 'observableObj' },
        { routerName: 'actualCombat', routerLink: 'actualCombat' },
        { routerName: 'otherSkill', routerLink: 'otherSkill' },
    ];
    
    constructor() {
    
    }
    
    ngOnInit() {
    }

}
