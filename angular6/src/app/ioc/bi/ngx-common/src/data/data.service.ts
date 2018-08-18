import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as _ from 'lodash';

import { ApiServer } from 'core-services/core';
import { CommonUtil } from '../util/common.util';
import { FilterData } from './data-type';
import { REQUEST_OPTIONS } from '../request-options';
import { UpdateService } from './update.service';

@Injectable({
    providedIn: 'root',
})

export class DataService {
    private datasetList: Array<any>;
    public apis: any = {
        datasets: 'datasets',
        aggregate: 'aggregate'
    };

    constructor(
        private route: ActivatedRoute,
        private dataServer: ApiServer,
        private updateService: UpdateService
    ) {}

    getDatasetList(refresh?: boolean): Observable<any> {
        if (refresh !== true && this.datasetList && this.datasetList.length) {
            return Observable.of(this.datasetList).pipe(delay(100));
        } else {
            let subject = new Subject();

            this.dataServer.get(this.apis.datasets, null, REQUEST_OPTIONS).subscribe((data: any) => {
                this.datasetList = data;
                subject.next(data);
            });

            return subject;
        }
    }

    linkDataset(datasetId, chartConfig): Observable<any> {
        if (_.isUndefined(datasetId) || _.isUndefined(chartConfig)) {
            return Observable.of(false);
        } else {
            let subject = new Subject();

            this.getDatasetList().subscribe((dsList) => {
                let dataset = _.find(dsList, function (e) {
                    return e.id === datasetId;
                });

                // link filter group
                _.each(chartConfig.filters, function (f) {
                    if (f.group) {
                        var group = _.find(dataset.data.filters, function (e) {
                            return e.id === f.id;
                        });
                        if (group) {
                            f.filters = group.filters;
                            f.group = group.group;
                        }
                    }
                });
                // link exp
                _.each(chartConfig.values, function (v) {
                    _.each(v.cols, function (c) {
                        if (c.type === 'exp') {
                            var exp = _.find(dataset.data.expressions, function (e) {
                                return c.id === e.id;
                            });
                            if (exp) {
                                c.exp = exp.exp;
                                c.alias = exp.alias;
                            }
                            // replace variable in exp
                            c.exp = replaceVariable(dataset.data.expressions, c);
                        }
                    });
                });
                function replaceVariable(expList, exp) {
                    var value = exp.exp;
                    var loopCnt = 0;
                    var context = {};
                    for (var i = 0; i < expList.length; i++) {
                        context[expList[i].alias] = expList[i].exp;
                    }
                    value = value.render2(context, function (v) {
                        return '(' + v + ')';
                    });
                    while (value.match(/\$\{.*?\}/g) != null) {
                        value = value.render2(context);
                        if (loopCnt++ > 10) {
                            throw 'Parser expresion [ ' + exp.exp + ' ] with error';
                        }
                    }
                    return value;
                }
                // link dimension
                let linkFunction = function (k) {
                    if (k.id) {
                        var _level;
                        var _dimension;
                        _.each(dataset.data.schema.dimension, function (e) {
                            if (e.type === 'level') {
                                _.each(e.columns, function (c) {
                                    if (c.id === k.id) {
                                        _dimension = c;
                                        _level = e;
                                    }
                                });
                            } else if (k.id === e.id) {
                                _dimension = e;
                            }
                        });
                        if (_dimension && _dimension.alias) {
                            k.alias = _dimension.alias;
                            if (_level) {
                                k.level = _level.alias;
                            }
                        }
                    }
                };
                _.each(chartConfig.keys, linkFunction);
                _.each(chartConfig.groups, linkFunction);

                subject.next(true);
            });

            return subject;
        }
    }

    private getDimensionConfig(array) {
        let result = [];

        if (array) {
            _.each(array, function (e) {
                if (_.isUndefined(e.group)) {
                    result.push(new FilterData(e.col, e.type, e.values, e.id));
                } else {
                    _.each(e.filters, function (f) {
                        result.push(new FilterData(e.col, e.type, e.values));
                    });
                }
            });
        }

        return result;
    }

    getDimensionValues(datasource, query, datasetId, colmunName, chartConfig, callback) {
        let owner = this;

        chartConfig = _.clone(chartConfig);

        this.linkDataset(datasetId, chartConfig).subscribe(() => {
            let cfg = undefined;

            if (chartConfig) {
                cfg = { rows: [], columns: [], filters: [] };
                cfg.rows = owner.getDimensionConfig(chartConfig.keys);
                cfg.columns = owner.getDimensionConfig(chartConfig.groups);
                cfg.filters = owner.getDimensionConfig(chartConfig.filters);
            }

            this.dataServer.post('dimension-values', {
                datasourceId: datasource,
                query: JSON.stringify(query),
                datasetId: datasetId,
                colmunName: colmunName,
                cfg: JSON.stringify(cfg),
            }, REQUEST_OPTIONS).subscribe(callback);
        });
    }

    getConfiguration(chartConfig) {
        let cfg = {
            rows: [],
            columns: [],
            filters: [],
            values: []
        };
        let dataSeries = this.getDataSeriesViaConfig(chartConfig);

        cfg.rows = this.getDimensionConfig(chartConfig.keys);
        cfg.columns = this.getDimensionConfig(chartConfig.groups);
        cfg.filters = this.getDimensionConfig(chartConfig.filters);
        cfg.filters = cfg.filters.concat(this.getDimensionConfig(chartConfig.boardFilters));
        cfg.filters = cfg.filters.concat(this.getDimensionConfig(chartConfig.boardWidgetFilters));
        cfg.values = _.map(dataSeries, function (s) {
            return { column: s.name, aggType: s.aggregate };
        });

        return cfg;
    }

    getDataSeries(datasource, query, datasetId, chartConfig, callback, reload) {
        let queryData: any = {
            datasourceId: datasource,
            datasetId: datasetId,
            reportId: this.route.snapshot.queryParams.id,
            query: JSON.stringify(query),
            cfg: JSON.stringify(this.getConfiguration(chartConfig)),
            reload: reload
        };
        let range = this.route.snapshot.queryParams.range;

        if (range) {
            range = range.split('_');
            queryData.beginTime = range[0];
            queryData.endTime = range[1];
        }
        chartConfig = _.clone(chartConfig);
        this.updateService.updateConfig(chartConfig);
        this.linkDataset(datasetId, chartConfig).subscribe(() => {
            this.dataServer.post(this.apis.aggregate, queryData, REQUEST_OPTIONS).subscribe((data: any) => {
                let result: any = this.castRawData2Series(data, chartConfig);

                result.chartConfig = chartConfig;
                if (!_.isUndefined(datasetId)) {
                    this.getDrillConfig(datasetId, chartConfig).subscribe(function (c) {
                        result.drill = { config: c };
                        callback(result);
                    });
                } else {
                    callback(result);
                }
            });
        });
    };

    getDrillPath(datasetId, id): Observable<any> {
        let subject = new Subject();

        this.getDatasetList().subscribe((dsList: any) => {
            let dataset = _.find(dsList, function (e) {
                return e.id === datasetId;
            });
            let path = [];
            let level;

            _.each(dataset.data.schema.dimension, function (_e) {
                if (_e.type === 'level') {
                    _.each(_e.columns, function (_c) {
                        if (_c.id === id) {
                            path = _e.columns;
                            level = _e;
                        }
                    });
                }
            });
            path = _.map(path, function (e) {
                return {
                    id: e.id,
                    alias: e.alias,
                    col: e.column,
                    level: level.alias,
                    type: '=',
                    values: [],
                    sort: 'asc'
                }
            });
            subject.next(path);
        });

        return subject;
    };

    getDrillConfig(datasetId, chartConfig): Observable<any> {
        let subject = new Subject();

        this.getDatasetList().subscribe((dsList: any) => {
            let drillConfig = {};
            let dataset = _.find(dsList, function (e) {
                return e.id === datasetId;
            });

            if (!dataset.data.schema || dataset.data.schema.dimension.length === 0) {
                subject.next(drillConfig);
                return;
            }
            let _f = function(array) {
                _.each(array, function (c, i_array) {
                    let level;
                    let i_level;
                    let prevIsInLevel = false;

                    _.find(dataset.data.schema.dimension, function (_e) {
                        if (_e.type === 'level') {
                            return _.find(_e.columns, function (_c, _i) {
                                if (_c.id === c.id) {
                                    level = _e;
                                    i_level = _i;
                                    return true;
                                }
                            });
                        }
                    });
                    if (!level) {
                        return;
                    }
                    if (+i_array > 0 && i_level > 0) {
                        prevIsInLevel = array[+i_array - 1].id === level.columns[i_level - 1].id;
                    }
                    let prevDrilled = +i_array > 0 && array[+i_array - 1].values.length === 1 && array[+i_array - 1].type === '=';
                    let nextIsInLevel = false;

                    if (+i_array < array.length - 1 && i_level < level.columns.length - 1) {
                        nextIsInLevel = array[i_array + 1].id === level.columns[i_level + 1].id;
                    }
                    let isLastLevel = i_level === level.columns.length - 1;
                    let drillDownExistIdx: any = 0;
                    let drillDownExist = _.find(array, function (e, i) {
                        if (i_level < level.columns.length - 1 && level.columns[i_level + 1].id === e.id) {
                            drillDownExistIdx = i;
                            return true;
                        }
                    });
                    // if next level exist in array,the level must be the next of current
                    let drillDown = drillDownExist ? drillDownExistIdx === i_array + 1 : true;
                    let up = i_level > 0 && +i_array > 0 && prevIsInLevel && (+i_array === array.length - 1 || !nextIsInLevel) && prevDrilled;
                    let down = (nextIsInLevel || !isLastLevel) && drillDown && (!prevIsInLevel || (array[+i_array - 1].type === '=' && array[+i_array - 1].values.length === 1));

                    drillConfig[c.id] = {
                        up: up,
                        down: down
                    };
                });
            };
            _f(chartConfig.keys);
            _f(chartConfig.groups);
            subject.next(drillConfig);
        });

        return subject;
    }

    viewQuery(params, callback) {
        let owner = this;

        params.config = {...params.config};
        this.updateService.updateConfig(params.config);
        this.linkDataset(params.datasetId, params.config).subscribe(() => {
            let dataSeries = owner.getDataSeriesViaConfig(params.config);
            let cfg = {
                rows: [],
                columns: [],
                filters: [],
                values: []
            };

            cfg.rows = owner.getDimensionConfig(params.config.keys);
            cfg.columns = owner.getDimensionConfig(params.config.groups);
            cfg.filters = owner.getDimensionConfig(params.config.filters);
            cfg.filters = cfg.filters.concat(owner.getDimensionConfig(params.config.boardFilters));
            cfg.values = _.map(dataSeries, function (s) {
                return {
                    column: s.name,
                    aggType: s.aggregate
                };
            });
            this.dataServer.post('aggregate-query', {
                datasourceId: params.datasource,
                query: JSON.stringify(params.query),
                datasetId: params.datasetId,
                cfg: JSON.stringify(cfg),
            }, REQUEST_OPTIONS).subscribe((data: any) => {
                callback(data[0]);
            });
        });
    }

    getColumns(option) {
        this.dataServer.post('columns', {
            datasourceId: option.datasource,
            query: option.query ? JSON.stringify(option.query) : null,
            datasetId: option.datasetId,
            reload: option.reload
        }, REQUEST_OPTIONS).subscribe((data: any) => {
            option.callback(data);
        });
    }

    private getDataSeriesViaConfig(chartConfig) {
        let owner = this;
        let result = [];

        _.each(chartConfig.values, function (v) {
            _.each(v.cols, function (c) {
                let series = owner.configToDataSeries(c);

                _.each(series, function (s) {
                    if (!_.find(result, function (e) {
                        return JSON.stringify(e) === JSON.stringify(s);
                    })) {
                        result.push(s);
                    }
                });
            });
        });

        return result;
    }

    private configToDataSeries(config) {
        switch (config.type) {
            case 'exp':
                return this.getExpSeries(config.exp);
            default:
                return [{
                    name: config.col,
                    aggregate: config.aggregate_type
                }];
        }
    }

    private getExpSeries(exp) {
        return this.parserExp(exp).aggs;
    }

    private filter(cfg, iv) {
        if(!cfg.f_values || !cfg.f_type) {
            return true;
        }
        let v = cfg.f_values[0];
        let a = v;
        let b = cfg.f_values[1];
        let params = this.toNumber(iv, v);

        switch (cfg.f_type) {
            case '=':
            case 'eq':
                for (let i = 0; i < cfg.f_values.length; i++) {
                    if (iv === cfg.f_values[i]) {
                        return true;
                    }
                }
                return cfg.f_values.length === 0;
            case '≠':
            case 'ne':
                for (let i = 0; i < cfg.f_values.length; i++) {
                    if (iv === cfg.f_values[i]) {
                        return false;
                    }
                }
                return true;
            case '>':
                if (!_.isUndefined(v) && params[0] <= params[1]) {
                    return false;
                }
                return true;
            case '<':
                if (!_.isUndefined(v) && params[0] >= params[1]) {
                    return false;
                }
                return true;
            case '≥':
                if (!_.isUndefined(v) && params[0] < params[1]) {
                    return false;
                }
                return true;
            case '≤':
                if (!_.isUndefined(v) && params[0] > params[1]) {
                    return false;
                }
                return true;
            case '(a,b]':
                params = this.toNumber(iv, a, b);
                if (!_.isUndefined(a) && !_.isUndefined(b) && (params[0] <= params[1] || params[0] > params[2])) {
                    return false;
                }
                return true;
            case '[a,b)':
                params = this.toNumber(iv, a, b);
                if (!_.isUndefined(a) && !_.isUndefined(b) && (params[0] < params[1] || params[0] >= params[2])) {
                    return false;
                }
                return true;
            case '(a,b)':
                params = this.toNumber(iv, a, b);
                if (!_.isUndefined(a) && !_.isUndefined(b) && (params[0] <= params[1] || params[0] >= params[2])) {
                    return false;
                }
                return true;
            case '[a,b]':
                params = this.toNumber(iv, a, b);
                if (!_.isUndefined(a) && !_.isUndefined(b) && (params[0] < params[1] || params[0] > params[2])) {
                    return false;
                }
                return true;
            default:
                return true;
        }
    }

    toNumber(...args: Array<any>) {
        let arr = _.isArray(args[0]) ? args[0] : args;
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            let a = Number(arr[i]);

            if (isNaN(a)) {
                return arr;
            } else {
                result.push(a);
            }
        }

        return result;
    }

    /**
     * Cast the aggregated raw data into data series
     * @param rawData
     * @param chartConfig
     */
    castRawData2Series(aggData, chartConfig) {
        let owner = this;
        let castedKeys = new Array();
        let castedGroups = new Array();
        let joinedKeys = {};
        let joinedGroups = {};
        let newData = {};
        let getIndex = function (columnList, col) {
            let result = new Array();

            if (col) {
                for (let j = 0; j < col.length; j++) {
                    let idx = _.find(columnList, function (e) {
                        return e.name === col[j];
                    });
                    result.push(idx.index);
                }
            }

            return result;
        };

        let keysIdx = getIndex(aggData.columnList, _.map(chartConfig.keys, function (e) {
            return e.col;
        }));
        let keysSort = _.map(chartConfig.keys, function (e) {
            return e.sort;
        });
        let groupsIdx = getIndex(aggData.columnList, _.map(chartConfig.groups, function (e) {
            return e.col;
        }));
        let groupsSort = _.map(chartConfig.groups, function (e) {
            return e.sort;
        });
        let valueSeries = _.filter(aggData.columnList, function (e) {
            return e.aggType;
        });
        for (let i = 0; i < aggData.data.length; i++) {
            // 组合keys
            let newKey = owner.getRowElements(aggData.data[i], keysIdx);
            let jk = newKey.join('-');

            if (_.isUndefined(joinedKeys[jk])) {
                castedKeys.push(newKey);
                joinedKeys[jk] = true;
            }
            // 组合groups
            let group = owner.getRowElements(aggData.data[i], groupsIdx);
            let newGroup = group.join('-');

            if (_.isUndefined(joinedGroups[newGroup])) {
                castedGroups.push(group);
                joinedGroups[newGroup] = true;
            }
            // pick the raw values into coordinate cell and then use aggregate function to do calculate
            _.each(valueSeries, function (dSeries: any) {
                if (_.isUndefined(newData[newGroup])) {
                    newData[newGroup] = {};
                }
                if (_.isUndefined(newData[newGroup][dSeries.name])) {
                    newData[newGroup][dSeries.name] = {};
                }
                if (_.isUndefined(newData[newGroup][dSeries.name][dSeries.aggType])) {
                    newData[newGroup][dSeries.name][dSeries.aggType] = {};
                }
                // if (_.isUndefined(newData[newGroup][dSeries.name][dSeries.aggType][jk])) {
                //     newData[newGroup][dSeries.name][dSeries.aggType][jk] = [];
                // }
                newData[newGroup][dSeries.name][dSeries.aggType][jk] = parseFloat(aggData.data[i][dSeries.index]);
            });
        }
        // sort dimension
        let getSort = function (sort) {
            return function (a, b) {
                let r = 0;
                let j = 0;

                for (; j < a.length; j++) {
                    if (!sort[j]) {
                        continue;
                    }
                    if (a[j] === b[j]) {
                        r = 0;
                        continue;
                    }
                    let params = owner.toNumber(a[j], b[j]);

                    r = (params[0] > params[1]) ? 1 : -1;
                    if (sort[j] === 'desc') {
                        r = r * -1;
                    }
                    break;
                }
                return r;
            }
        };
        castedKeys.sort(getSort(keysSort));
        castedGroups.sort(getSort(groupsSort));
        //
        let castedAliasSeriesName = new Array();
        let aliasSeriesConfig = {};
        let aliasData = new Array();
        let valueSort = undefined;
        let valueSortArr = [];

        _.each(castedGroups, function (group) {
            _.each(chartConfig.values, function (value) {
                if (value && value.cols) {
                    _.each(value.cols, function (series) {
                        if (_.isUndefined(valueSort) && series.sort) {
                            valueSort = series.sort;
                            owner.castSeriesData(series, group.join('-'), castedKeys, newData, function (castedData, keyIdx) {
                                valueSortArr[keyIdx] = { v: castedData, i: keyIdx };
                            });
                        }
                    });
                }
            });
        });

        if (!_.isUndefined(valueSort)) {
            valueSortArr.sort(function (a, b) {
                if (a.v === b.v) {
                    return 0;
                }
                let p = owner.toNumber(a.v, b.v)
                if ((p[0] < p[1]) ^ valueSort === 'asc') {
                    return 1;
                } else {
                    return -1;
                }
            });
            let tk = [...castedKeys];

            _.each(valueSortArr, function (e, i) {
                castedKeys[i] = tk[e.i];
            });
        }

        _.each(castedGroups, function (group) {
            _.each(chartConfig.values, function (value, vIdx) {
                _.each(value.cols, function (series) {
                    let seriesName = series.alias ? series.alias : series.col;
                    let newSeriesName = seriesName;

                    if (group && group.length > 0) {
                        let a = [].concat(group);

                        a.push(seriesName);
                        newSeriesName = a.join('-');
                        castedAliasSeriesName.push(a);
                    } else {
                        castedAliasSeriesName.push([seriesName]);
                    }
                    // castedAliasSeriesName.push(newSeriesName);
                    aliasSeriesConfig[newSeriesName] = {
                        type: value.series_type,
                        valueAxisIndex: vIdx,
                        formatter: series.formatter
                    };
                    owner.castSeriesData(series, group.join('-'), castedKeys, newData, function (castedData, keyIdx) {
                        if (!aliasData[castedAliasSeriesName.length - 1]) {
                            aliasData[castedAliasSeriesName.length - 1] = new Array();
                        }
                        // Only format decimal
                        aliasData[castedAliasSeriesName.length - 1][keyIdx] = castedData;
                    });
                });
            });
        });
        for (let i = 0; i < castedKeys.length; i++) {
            let s = 0;
            let f = true;

            _.each(castedGroups, function (group) {
                _.each(chartConfig.values, function (value) {
                    if (value && value.cols) {
                        _.each(value.cols, function (series) {
                            if (!f) {
                                return;
                            }
                            if (series && series.f_top && series.f_top <= i) {
                                f = false;
                            }
                            if (!owner.filter(series, aliasData[s][i])) {
                                f = false;
                            }
                            if (f) {
                                if (!aliasData[s][i]) {
                                    aliasData[s][i] = 0
                                }
                                aliasData[s][i] = CommonUtil.dataFormat(aliasData[s][i]);
                            }
                            s++;
                        });
                    }
                });
            });
            if (!f) {
                castedKeys.splice(i, 1);
                _.each(aliasData, function (_series) {
                    _series.splice(i, 1);
                });
                i--;
            }
        }

        return {
            keys: castedKeys,
            series: castedAliasSeriesName,
            data: aliasData,
            seriesConfig: aliasSeriesConfig
        };
    }

    getDateString(date: any): string {
        return date.year + '' + (date.month < 10 ? '0' : '') + date.month + (date.day < 10 ? '0' : '') + date.day;
    }

    getConfigs(board: any) {
        let configs = [];

        if (board && board.layout) {
            board.layout.rows.forEach((row) => {
                if (!row.widgets) {
                    return;
                }
                row.widgets.forEach((widget) => {
                    try {
                        configs.push(this.getConfiguration(widget.widget.data.config));
                    } catch (e) {
                        console.error('ERROR ---------- DataService getConfigs');
                        console.error(e);
                    }
                });
            });
        }

        return configs;
    }


    parserExp(rawExp) {
        let evalExp = rawExp;
        let _temp = [];
        let aggs = [];
        let names = []; // expression text in aggreagtion function, could be a columnName or script

        evalExp = evalExp.trim().replace(/[\n|\r|\r\n]/g, '');
        _.each(evalExp.match(/'.*?'/g), function (qutaText) {
            evalExp = evalExp.replace(qutaText, '_#' + _temp.length);
            _temp.push(qutaText);
        });
        _.each(evalExp.match(/(sum|avg|count|max|min|distinct)\('?.*?'?\)/g), function (aggUnit) {
            let aggregate = aggUnit.substring(0, aggUnit.indexOf('('));
            let name = aggUnit.substring(aggUnit.indexOf('(') + 1, aggUnit.indexOf(')'));

            if (name.match('_#')) {
                name = _temp[name.replace('_#', '')].replace(/\'/g, '');
            }
            evalExp = evalExp.replace(aggUnit, 'groupData[_names[' + names.length + ']]["' + aggregate + '"][key]');
            names.push(name);
            aggs.push({
                name: name,
                aggregate: aggregate
            });
        });

        return {
            evalExp: evalExp,
            aggs: aggs,
            names: names
        };
    }

    private castSeriesData(series, group, castedKeys, newData, iterator) {
        switch (series.type) {
            case 'exp':
                let runExp = this.compileExp(series.exp);

                for (let i = 0; i < castedKeys.length; i++) {
                    iterator(runExp(newData[group], castedKeys[i].join('-')), i);
                }
                break;
            default:
                for (let i = 0; i < castedKeys.length; i++) {
                    iterator(newData[group][series.col][series.aggregate_type][castedKeys[i].join('-')], i)
                }
                break;
        }
    }

    private compileExp = function (exp) {
        let parseredExp = this.parserExp(exp);

        return function (groupData, key) {
            let _names = parseredExp.names;

            return eval(parseredExp.evalExp);
        };
    }

    private aggregate(data: Array<any>, fnc) {
        if (!data) {
            return data;
        }
        switch (fnc) {
            case 'sum':
                return this.aggregate_sum(data);
            case 'count':
                return this.aggregate_count(data);
            case 'avg':
                return this.aggregate_avg(data);
            case 'max':
                return parseFloat(_.max(data));
            case 'min':
                return parseFloat(_.min(data));
        }
    }

    private aggregate_sum(data: Array<any>): number {
        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            let f = parseFloat(data[i]);

            if (f) {
                sum += f;
            }
        }

        return sum;
    }

    private aggregate_count(data: Array<any>): number {
        return data.length;
    }

    private aggregate_avg(data: Array<any>): number {
        let sum = 0;
        let count = 0;

        for (let i = 0; i < data.length; i++) {
            let f = parseFloat(data[i]);

            if (f) {
                sum += f;
                count++;
            }
        }

        return count === 0 ? 0 : sum / count;
    }

    private getHeaderIndex(chartData, col): Array<any> {
        let result = new Array();

        if (col) {
            for (let j = 0; j < col.length; j++) {
                let idx = _.indexOf(chartData[0], col[j]);
                result.push(idx);
            }
        }

        return result;
    }

    private getRowElements(row, elmIdxs) {
        let arr = new Array();

        for (let j = 0; j < elmIdxs.length; j++) {
            let elm = row[elmIdxs[j]];

            arr.push(elm);
        }

        return arr;
    }
}
