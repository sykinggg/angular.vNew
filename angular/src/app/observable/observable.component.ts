import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

@Component({
    selector: 'app-observable',
    templateUrl: './observable.component.html',
    styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {
    
    routerLinkArr: Array<any> = [
        { routerName: 'observableObj', routerLink: 'observableObj' },
        { routerName: 'subscriber', routerLink: 'subscriber' },
        { routerName: 'RxJs', routerLink: 'RxJs' },
        { routerName: 'actualCombat', routerLink: 'actualCombat' },
        { routerName: 'otherSkill', routerLink: 'otherSkill' },
    ];
    
    constructor() {
    
    }
    
    ngOnInit() {
    }

}
