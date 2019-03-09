import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HInit } from './IHChart';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-hchart',
    templateUrl: './hchart.component.html',
    styleUrls: ['./hchart.component.scss']
})
export class HChartComponent implements OnInit {
    
    hChartObj: any;
    chart: any = {};
    option: BehaviorSubject<any> = new BehaviorSubject({});
    highClass: string;
    @Input() set hChart(option: HInit) {
        this.option.next(option);
    }

    @Output() ReturnchangeData: EventEmitter<any> = new EventEmitter<any>();

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.highClass = 'hChart' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
    }

    defaultChart(option) {
        if (!option.config.chart) {
            option.config.chart = {
                renderTo: $(('.' + this.highClass), this.elementRef.nativeElement).get(0),
                type: 'line'
            }
        }

        option.config.chart.renderTo = $(('.' + this.highClass), this.elementRef.nativeElement).get(0);

        Highcharts.chart(option.config);

        this.ReturnchangeData.emit(this.hChartObj);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.option.subscribe(data => {
                this.chart.config = data;
                this.defaultChart(this.chart);
            })
        }, 500)
    }
}
