import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-component2',
    templateUrl: './dynamic-component2.component.html',
    styleUrls: ['./dynamic-component2.component.scss']
})
export class DynamicComponent2Component implements OnInit {

    @Input() data: any;

    constructor() { }

    ngOnInit() {
    }

}
