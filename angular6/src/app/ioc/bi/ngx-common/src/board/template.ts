import { Component, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

import { ApiServer } from 'core-services/core';
import { DataService } from '../data/data.service';
import { ChartService } from '../chart/chart.service';
import { REQUEST_OPTIONS } from '../request-options';
import { BoardService } from '../board/board.service';
import { ParamService } from '../param/param.service';

export class Template implements OnInit, OnDestroy {
    protected apis = {
        layout: 'board-data'
    };

    paramsInitialized = false;
    loading = true;
    intervals = [];
    intervalGroup: any;
    timeline = [];
    datasetList: Array<any>;
    realtimeDataset: any;
    datasetMeta: any;

    timelineColor = [
        'info',
        'danger',
        'success',
        'warning',
        'secondary',
        'primary',
        'dark'
    ];
    board: any = {};

    constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected route: ActivatedRoute,
        protected dataServer: ApiServer,
        protected dataService: DataService,
        protected boardService: BoardService,
        protected paramService: ParamService,
        protected chartService: ChartService
    ) {}

    ngOnInit() {
        this.boardService.applyParamsSubject.pipe(debounceTime(800)).subscribe(() => {
            this.applyParamFilter();
        });
        this.paramService.initParamsSubject.subscribe((data) => {
            if (data === 0) {
                this.loadWidget(false);
                this.paramsInitialized = true;
            }
        });
        this.dataService.getDatasetList().subscribe((data: any) => {
            this.datasetList = data;
        });
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.intervals.forEach((interval) => {
                    interval.unsubscribe();
                });
                this.initComponent();
                this.load(false);
            }
        });
    }

    ngOnDestroy() {
    }

    protected getID() {
        return this.route.snapshot.params['id'];
    }

    protected initComponent() {
        this.paramService.quantity = 0;
        this.boardService.datasetFilters = {};
        this.boardService.widgetFilters = {};
        this.boardService.relationFilters = {};

        this.paramsInitialized = false;
        this.loading = true;
        this.timeline.length = 0;
        this.intervalGroup = {};
        this.realtimeDataset = {};
        this.datasetMeta = {};
        this.intervals.length = 0;
    }

    protected applyParamFilter() {
        this.boardService.beforeFilter();
        this.board.layout.rows.forEach((row) => {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach((w) => {
                try {
                    this.chartService.realTimeRender(w.realTimeTicket, this.boardService.injectFilter(w.widget).data, null, w, true);
                } catch (e) {
                    console.error(e);
                }
            });
        });
    }

    protected load(reload: boolean): Observable<any> {
        let subject = new Subject();

        this.loading = true;
        this.intervals.forEach((interval) => {
            interval.unsubscribe();
        });
        this.intervals = [];

        this.dataServer.get(this.apis.layout, {
            id: this.getID()
        }, REQUEST_OPTIONS).subscribe((data: any) => {
            this.intervalGroup = {};
            this.loading = false;
            this.board = this.boardService.board = data;
            this.board.layout.rows.forEach((row) => {
                if (row.params) {
                    this.paramService.quantity += row.params.length;
                }
            });
            if (this.board.layout.type === 'timeline') {
                this.groupTimeline();
            }
            if (this.paramService.quantity === 0) {
                this.loadWidget(reload);
                this.paramsInitialized = true;
            }
            subject.next(this.board);
        });

        return subject;
    }

    private groupTimeline() {
        let group = undefined;

        this.timeline = [];
        this.board.layout.rows.forEach((row, idx: number) => {
            if (idx === 0) {
                return;
            }
            row.show = false;
            if (row.node === 'parent') {
                if (group) {
                    this.timeline.push(group);
                }
                group = [];
                row.show = true;
            }
            group.push(row);
        });
        this.timeline.push(group);
    }

    private loadWidget(reload) {
        let dsReloadStatus = this.boardService.initDsReloadStatus(reload);

        this.boardService.beforeFilter();
        this.board.layout.rows.forEach((row) => {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach((widget) => {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                    return;
                }
                let dataSetId = widget.widget.data.datasetId;

                // avoid repeat load offline dataset data
                if (dataSetId !== undefined && reload) {
                    dsReloadStatus[dataSetId] =  false;
                }
                if (this.board.layout.type === 'timeline') {
                    if (row.show) {
                        widget.show = true;
                    }
                } else {
                    widget.show = true;
                }
                // real time load task
                let w = widget.widget.data;
                let ds = _.find(this.datasetList, (e) => {
                    return e.id === w.datasetId;
                });
                if (ds && ds.data.interval && ds.data.interval > 0) {
                    if (!this.intervalGroup[w.datasetId] && !widget.sourceId) {
                        let timer = Observable.interval(ds.data.interval * 1000);

                        this.intervalGroup[w.datasetId] = [];
                        this.intervals.push(timer);
                        timer.subscribe(() => {
                            // Refresh Params
                            this.boardService.beforeFilter();
                            _.each(this.intervalGroup[w.datasetId], (e) => {
                                e();
                            });
                        });
                    }
                    this.intervalGroup[w.datasetId].push(() => {
                        try {
                            if (widget.show) {
                                this.chartService.realTimeRender(widget.realTimeTicket, this.boardService.injectFilter(widget.widget).data);
                                if (widget.modalRealTimeTicket) {
                                    this.chartService.realTimeRender(widget.modalRealTimeTicket, this.boardService.injectFilter(widget.widget).data, widget.modalRealTimeOption.optionFilter, null);
                                }
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    });
                }
            });
        });
    }
}