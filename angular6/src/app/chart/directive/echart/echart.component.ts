import { Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';
import { EChartOption } from './echart.IComponent';
// import * as echarts from 'echarts';
var echarts = require('echarts');
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
        console.log(option);
        if (!option.init) {
            option.init = {};
        }
        if (!option.init.dom) {
            option.init.dom = this.elementRef.nativeElement.querySelector('div');;
        }
        if (!this.charts && !option.init) {
            console.log('需要声明的初始化chart组件初始化dom!');
            return;
        } else {
            this.charts = echarts.init(option.init.dom);
        }
        console.log(this.charts);
        let returnParams = {}

        this.funArr.map(item => {
            if (option[item]) {
                console.log(this.charts);
                returnParams[item] = this.charts[item](option[item]);
            }
        })

        this.ReturnchangeData.emit(returnParams);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.option.subscribe(data => {
            this.defaultChart(data);
        })
    }
}
