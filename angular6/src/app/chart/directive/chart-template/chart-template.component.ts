import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-chart-template',
    templateUrl: './chart-template.component.html',
    styleUrls: ['./chart-template.component.scss']
})
export class ChartTemplateComponent implements OnInit {

    chartOptionArr: any;
    @Input() set chartOptions(option) {
        if (option && option.length && this.isArray(option)) {
            this.chartOptionArr = option;
        }
    }

    @Output() chartOptionArrFun: EventEmitter<any> = new EventEmitter<any>();

    public isArray(arr: any): boolean {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    chartObjArr: Array<any> = [];
    public ReturnchangeData(chart): any {
        this.chartObjArr.push(chart);
        if (this.chartOptionArr.length === this.chartObjArr.length) {
            this.chartOptionArrFun.emit(this.chartObjArr);
        }
    }

    constructor() { }

    ngOnInit() {
    }

}
