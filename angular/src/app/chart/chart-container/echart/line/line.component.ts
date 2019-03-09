import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-line',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

    @Input() outsideData: any;

    constructor() { }

    ReturnchangeData1(event) {
        // console.log(event);
    }

    ngOnInit() {
        this.loadComponent(this.outsideData.init);
    }

    loadComponent(data) {
        // console.log(data);
    }

}
