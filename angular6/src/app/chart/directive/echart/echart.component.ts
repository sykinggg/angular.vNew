import { Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';
import { EChartOption } from './echart.IComponent';
// import * as echarts from 'echarts';
let echarts = require('echarts');
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-echart',
    templateUrl: './echart.component.html',
    styleUrls: ['./echart.component.scss']
})
export class EchartComponent implements OnInit, AfterViewInit {

    charts: any;
    funArr = ['connect', 'disconnect', 'dispose', 'getInstanceByDom', 'registerMap', 'getMap', 'registerTheme', 'setOption'];
    option: BehaviorSubject<any> = new BehaviorSubject({});

    @Input() set setdata(option: EChartOption) {
        this.option.next(option);
    }

    @Output() ReturnchangeData: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private elementRef: ElementRef
    ) { }

    defaultChart(option) {
        if (!option.init) {
            option.init = {};
        }
        if (!option.init.dom) {
            option.init.dom = $('.echart-content').get(0);
        }
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

    optionData;
    ngOnInit() { }

    ngAfterViewInit() {
        this.option.subscribe(data => {
            this.optionData = data;
            this.defaultChart(this.optionData);
        })
        if (this.optionData) {
            this.defaultChart(this.optionData);
        }
    }
}
