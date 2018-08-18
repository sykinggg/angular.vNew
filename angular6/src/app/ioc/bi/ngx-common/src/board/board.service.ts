import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable({
    providedIn: 'root',
})

export class BoardService {
    applyParamsSubject: Subject<any>;
    datasetFilters: any;
    widgetFilters: any;
    relationFilters: any;
    board: any;
    relations: Array<any>;

    constructor(private route: ActivatedRoute) {
        this.applyParamsSubject = new Subject();

        this.widgetFilters = {};
        this.datasetFilters = {};
        this.relationFilters = {};
        this.board = {};
        this.relations = [];
    }

    beforeFilter() {
        this.datasetFilters = {};
        this.widgetFilters = {};
        this.relationFilters = {};

        this.board.layout.rows.forEach((row) => {
            if (row.params) {
                this.paramToFilter(row.params);
            }
        });
        // 将点击的参数赋值到relationFilters中
        this.relations.forEach((relation) => {
            if (relation.targetId && relation.params && relation.params.length > 0) {
                relation.params.forEach((param) => {
                    let p = {
                        col: param.targetField,
                        type: '=',
                        values: [param.value]
                    };

                    if (!this.relationFilters[relation.targetId]) {
                        this.relationFilters[relation.targetId] = [];
                    }
                    this.relationFilters[relation.targetId].push(p); // relation.targetId == widgetId
                });
            }
        });
    }

    paramToFilter(params: Array<any>) {
        params.forEach((param) => {
            // 将点击的参数赋值到看板上的参数中
            // '{'targetId':3,'params':[{'targetField':'logo','value':'iphone'},{'targetField':'logo1','value':'上海市'}]}' targetField==param.name
            let queryParam = this.route.snapshot.params[param.name];

            if (queryParam) {
                param.values.push(queryParam.value);
            }
            if (!param.values.length) {
                return;
            }
            _.each(param.col, (col) => {
                let p = {
                    col: col.column,
                    type: param.type,
                    values: param.values
                };

                if (_.isUndefined(col.datasetId)) {
                    if (!this.widgetFilters[col.widgetId]) {
                        this.widgetFilters[col.widgetId] = [];
                    }
                    this.widgetFilters[col.widgetId].push(p);
                } else {
                    if (!this.datasetFilters[col.datasetId]) {
                        this.datasetFilters[col.datasetId] = [];
                    }
                    this.datasetFilters[col.datasetId].push(p);
                }
            });
        });
    }

    injectFilter(widget) {
        let boardFilters = [];

        if (!_.isUndefined(this.widgetFilters[widget.id])) {
            _.each(this.widgetFilters[widget.id], (e) => {
                boardFilters.push(e);
            });
        }
        if (!_.isUndefined(this.datasetFilters[widget.data.datasetId])) {
            _.each(this.datasetFilters[widget.data.datasetId], (e) => {
                boardFilters.push(e);
            });
        }
        if (!_.isUndefined(this.relationFilters[widget.id])) {
            _.each(this.relationFilters[widget.id], (e) => {
                boardFilters.push(e);
            });
        }
        widget.data.config.boardFilters = boardFilters;

        return widget;
    }

    initDsReloadStatus(reload: boolean): any {
        let dsReloadStatus = {};

        if(!this.board || !this.board.layout || !this.board.layout.rows) {
            return {};
        }

        this.board.layout.rows.forEach((row) => {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach((widget) => {
                let dataSetId = widget.widget.data.datasetId;

                if (dataSetId !== undefined) {
                    dsReloadStatus[dataSetId] = reload;
                }
            });
        });

        return dsReloadStatus;
    }
}