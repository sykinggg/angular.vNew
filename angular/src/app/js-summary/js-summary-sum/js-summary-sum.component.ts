import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-js-summary-sum',
    templateUrl: './js-summary-sum.component.html',
    styleUrls: ['./js-summary-sum.component.scss']
})
export class JsSummarySumComponent implements OnInit {

    constructor() { }

    private switch(type) {
        this[type] = !this[type];
    }

    ngOnInit() {
    }

}
