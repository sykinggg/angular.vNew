import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-custom-address-linkage',
    templateUrl: './custom-address-linkage.component.html',
    styleUrls: ['./custom-address-linkage.component.scss']
})
export class CustomAddressLinkageComponent implements OnInit {

    selectedArr: Array<any> = [];

    @Input()
    set setData(data: Array<string>) {
        if (data && data.length) {
            let i = 0;
            this.selectedArr[i] = {
                data: data,
                flag: data[0]
            };
            this.change(data[i], ++i);
        }
    };

    @Output() getData = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    private change(event, i) {
        if (event.child) {
            this.selectedArr.splice(i + 1);
            this.selectedArr.push({
                data: event.child,
                flag: event.child[0]
            })
        }
        if (event.child) {
            this.change(event.child, ++i);
        } else {
            this.getData.emit(this.selectedArr);
        }
    }

}
