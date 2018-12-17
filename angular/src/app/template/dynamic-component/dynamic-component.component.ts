import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dynamic-component',
    templateUrl: './dynamic-component.component.html',
    styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

    componentList: Array<any>;
    showComponent: any;

    constructor() {
        this.componentList = [
            {
                type: 'dy1',
                data: {
                    type: 'dy1',
                    value: 'dy1'
                }
            },
            {
                type: 'dy2',
                data: {
                    type: 'dy2',
                    value: 'dy2'
                }
            },
            {
                type: 'dy3',
                data: {
                    type: 'dy3',
                    value: 'dy3'
                }
            }
        ]
        this.showComponent = {
            type: 'dy1',
            data: {
                type: 'dy1',
                value: 'dy1'
            }
        };
    }

    choiceType(option) {
        this.showComponent = option;
    }

    ngOnInit() {
    }

}
