import { Component, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { AfterDialogInit, DialogResult } from 'core-services/core';
import { ChartService } from '../chart/chart.service';
import { BoardService } from './board.service';

@Component({
    template: require('./modal-widget.component.html!text')
})

export class ModalWidgetComponent implements AfterDialogInit {
    @Input() widget: any;

    loading = false;

    constructor(
        private elementRef: ElementRef,
        private boardService: BoardService,
        private chartService: ChartService
    ) {}

    afterDialogInit(dialog: DialogResult, modalContent: any) {
        let optionFilter = function(option: any) {
            option.toolbox = {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: true
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    dataZoom: {
                        show: true
                    },
                    restore: {
                        show: true
                    }
                }
            };
        };

        this.loading = true;
        this.widget = dialog.data.widget;
        this.chartService.render($('.widget-view', this.elementRef.nativeElement), this.boardService.injectFilter(this.widget.widget).data, optionFilter).subscribe((data) => {
            this.widget.modalRealTimeTicket =  data;
            this.loading = false;
        });
        this.widget.modalRealTimeOption = {
            optionFilter: optionFilter
        };
    }
}
