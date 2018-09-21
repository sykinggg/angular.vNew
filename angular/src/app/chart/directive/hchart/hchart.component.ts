import { Component, OnInit, Input, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { HInit, HCHART_OPTIONS } from './IHchart';
import { BehaviorSubject } from 'rxjs';

import * as Highcharts from 'highcharts';
import * as $ from 'jquery';

@Component({
    selector: 'app-hchart',
    templateUrl: './hchart.component.html',
    styleUrls: ['./hchart.component.scss']
})
export class HchartComponent implements OnInit, AfterViewInit {

    hChartObj: any;
    chart: any;
    option: BehaviorSubject<any> = new BehaviorSubject({});
    @Input() set hChart(option: HInit) {
        this.option.next(option);
    }

    @Output() ReturnchangeData: EventEmitter<any> = new EventEmitter<any>();

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
    }

    defaultChart(option) {
        if (!option.config.chart) {
            option.config.chart = {
                renderTo: $('.echart-content', this.elementRef.nativeElement).get(0),
                type: 'line'
            }
        }

        if (!option.config.chart.renderTo) {
            option.config.chart.renderTo = $('.echart-content', this.elementRef.nativeElement).get(0);
        }

        setTimeout(() => {
            Highcharts.chart(option.config);

            this.ReturnchangeData.emit(this.hChartObj);
        }, 1000);
    }

    ngAfterViewInit() {
        this.option.subscribe(data => {
            this.chart = data;
            this.defaultChart(this.chart);
        })
    }
}
