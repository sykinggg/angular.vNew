import { ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServer } from 'core-services/core';
import { DataService } from '../data/data.service';
import { ChartService } from '../chart/chart.service';
import { BoardService } from '../board/board.service';
import { ParamService } from '../param/param.service';
export declare class Template implements OnInit, OnDestroy {
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected route: ActivatedRoute;
    protected dataServer: ApiServer;
    protected dataService: DataService;
    protected boardService: BoardService;
    protected paramService: ParamService;
    protected chartService: ChartService;
    protected apis: {
        layout: string;
    };
    paramsInitialized: boolean;
    loading: boolean;
    intervals: any[];
    intervalGroup: any;
    timeline: any[];
    datasetList: Array<any>;
    realtimeDataset: any;
    datasetMeta: any;
    timelineColor: string[];
    board: any;
    constructor(componentFactoryResolver: ComponentFactoryResolver, route: ActivatedRoute, dataServer: ApiServer, dataService: DataService, boardService: BoardService, paramService: ParamService, chartService: ChartService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected getID(): any;
    protected initComponent(): void;
    protected applyParamFilter(): void;
    protected load(reload: boolean): Observable<any>;
    private groupTimeline;
    private loadWidget;
}
