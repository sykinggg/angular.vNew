import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { EChartOption } from './IChart';
// import * as echarts from 'echarts';
let echarts = require('echarts');
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    charts: any;
    funArr = ['connect', 'disconnect', 'dispose', 'getInstanceByDom', 'registerMap', 'getMap', 'registerTheme', 'setOption'];
    option: BehaviorSubject<any> = new BehaviorSubject({});

    @Input() set setdata(option: EChartOption) {
        if (option) {
            this.option.next(option);
        }
    }

    @Output() ReturnchangeData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private elementRef: ElementRef
    ) { }

    defaultChart(option) {
        if (!option.init) {
            option.init = {};
        }
        option.init.dom = $('.echart-chart-content', this.elementRef.nativeElement).get(0);
        if (option.init.dom) {
            if (!option.init.height) {
                option.init.height = 300;
            }
            if (!option.init.width) {
                option.init.width = 12;
            }
            if (!this.charts && option.init) {
                this.charts = echarts.init(option.init.dom);
            }
            this.charts.resize();
            let returnParams = {}

            this.funArr.map(item => {
                if (option[item]) {
                    returnParams[item] = this.charts[item](option[item]);
                }
            })

            this.ReturnchangeData.emit(this.charts);
        }
    }

    optionData;
    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.option.subscribe(data => {
                this.optionData = data;
                this.defaultChart(this.optionData);
            })
        }, 500)
    }
}
