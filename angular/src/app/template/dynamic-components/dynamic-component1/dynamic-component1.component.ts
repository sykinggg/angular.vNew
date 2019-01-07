import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-component1',
    templateUrl: './dynamic-component1.component.html',
    styleUrls: ['./dynamic-component1.component.scss']
})
export class DynamicComponent1Component implements OnInit {

    @Input() data: any;

    constructor() { }

    ngOnInit() {
    }

}
