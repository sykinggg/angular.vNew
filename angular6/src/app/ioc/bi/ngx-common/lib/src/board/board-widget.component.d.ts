import { ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'core-services/core';
import { ChartService } from '../chart/chart.service';
import { BoardService } from './board.service';
export declare class BoardWidgetComponent implements OnInit {
    private componentFactoryResolver;
    private elementRef;
    private router;
    private dialogService;
    private boardService;
    private chartService;
    widgetView: ViewContainerRef;
    widget: any;
    row: any;
    configurable: boolean;
    readonly: boolean;
    viewType: string;
    height: string;
    loading: boolean;
    constructor(componentFactoryResolver: ComponentFactoryResolver, elementRef: ElementRef, router: Router, dialogService: DialogService, boardService: BoardService, chartService: ChartService);
    ngOnInit(): void;
    modalTable(widget: any): void;
    modalChart(widget: any): void;
    reload(): void;
    config(): void;
    private render;
}
