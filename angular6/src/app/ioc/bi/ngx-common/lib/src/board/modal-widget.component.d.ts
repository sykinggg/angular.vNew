import { ElementRef } from '@angular/core';
import { AfterDialogInit, DialogResult } from 'core-services/core';
import { ChartService } from '../chart/chart.service';
import { BoardService } from './board.service';
export declare class ModalWidgetComponent implements AfterDialogInit {
    private elementRef;
    private boardService;
    private chartService;
    widget: any;
    loading: boolean;
    constructor(elementRef: ElementRef, boardService: BoardService, chartService: ChartService);
    afterDialogInit(dialog: DialogResult, modalContent: any): void;
}
