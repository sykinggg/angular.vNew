import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { DialogService } from 'core-services/core';
import { ChartService } from '../chart/chart.service';
import { BoardService } from './board.service';
import { ModalWidgetComponent } from './modal-widget.component';

@Component({
    selector: 'dashboard-widget',
    template: require('./board-widget.component.html!text')
})

export class BoardWidgetComponent implements OnInit {
    @ViewChild('widgetView', {read: ViewContainerRef}) widgetView: ViewContainerRef;
    @Input() widget: any;
    @Input() row: any;
    @Input() configurable: boolean;
    @Input() readonly = false;

    viewType: string;
    height: string;
    loading = false;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private router: Router,
        private dialogService: DialogService,
        private boardService: BoardService,
        private chartService: ChartService
    ) {}

    ngOnInit() {
        this.loading = true;
        this.height = (this.row.height ? (this.row.height - 44) : 300 + 'px') as string;
        switch (this.widget.widget.data.config.chart_type) {
            case 'map':
                this.viewType = 'chartContent';
                break;
            case 'kpi':
                this.height = 'auto';
                this.viewType = 'kpiContent';
               break;
            case 'table':
                this.viewType = 'chartContent';
                break;
            default:
                this.viewType = 'echartContent';
        }
        this.render();
    }

    modalTable(widget) {
        this.dialogService.show({
            title: widget.name,
            contentComponent: ModalWidgetComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                widget: widget
            }
        }, {
            size: 'lg'
        }).result.then((result) => {
            console.log(`Closed with: ${result}`);
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
        });
    }

    modalChart(widget) {
        this.dialogService.show({
            title: widget.name,
            contentComponent: ModalWidgetComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                widget: widget
        }, {
            size: 'lg'
        }).result.then((result) => {
            if (widget.modalRealTimeTicket) {
                delete widget.modalRealTimeTicket;
            }
            if (widget.modalRealTimeOption) {
                delete widget.modalRealTimeOption;
            }
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
        });
    }

    reload() {
        if (this.row.params) {
            this.boardService.paramToFilter(this.row.params);
        }
        this.render();
    }

    config() {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                id: this.widget.widget.id
            }
        };

        this.router.navigate(['/admin/config/widget'], navigationExtras);
    }

    private render(optionFilter?: any) {
        let needReload = false;
        let dataSetId = this.widget.widget.data.datasetId;
        let dsReloadStatus = this.boardService.initDsReloadStatus(needReload);
        let widgetData = this.boardService.injectFilter(this.widget.widget).data ;
        // 百度地图特殊处理
        let charType = widgetData.config.chart_type;

        this.loading = true;
        this.widget.show = true;
        // avoid repeat load offline dataset data
        if (dataSetId !== undefined) {
            needReload = dsReloadStatus[dataSetId] ? true : false;

            dsReloadStatus[dataSetId] =  false;
        }
        if (charType === 'chinaMapBmap') {
            this.chartService.render($('.widget-view', this.elementRef.nativeElement), widgetData, optionFilter, needReload);
            this.loading = false;
        } else {
            this.chartService.render($('.widget-view', this.elementRef.nativeElement), widgetData, optionFilter, needReload, null, this.widget.relations).subscribe((data) => {
                this.widget.realTimeTicket = data;
                this.loading = false;
            });
        }
        this.widget.realTimeOption = {
            ptionFilter: optionFilter
        };
    }
}
