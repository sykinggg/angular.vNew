import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-dynamic-component3',
    templateUrl: './dynamic-component3.component.html',
    styleUrls: ['./dynamic-component3.component.scss']
})
export class DynamicComponent3Component implements OnInit {

    @Input() data: any;

    constructor() { }

    ngOnInit() {
    }

}
