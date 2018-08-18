"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var _ = require("lodash");
var core_2 = require("core-services/core");
var common_util_1 = require("../util/common.util");
var data_type_1 = require("./data-type");
var request_options_1 = require("../request-options");
var update_service_1 = require("./update.service");
var DataService = /** @class */ (function () {
    function DataService(route, dataServer, updateService) {
        this.route = route;
        this.dataServer = dataServer;
        this.updateService = updateService;
        this.apis = {
            datasets: 'datasets',
            aggregate: 'aggregate'
        };
        this.compileExp = function (exp) {
            var parseredExp = this.parserExp(exp);
            return function (groupData, key) {
                var _names = parseredExp.names;
                return eval(parseredExp.evalExp);
            };
        };
    }
    DataService.prototype.getDatasetList = function (refresh) {
        var _this = this;
        if (refresh !== true && this.datasetList && this.datasetList.length) {
            return rxjs_1.Observable.of(this.datasetList).pipe(operators_1.delay(100));
        }
        else {
            var subject_1 = new rxjs_1.Subject();
            this.dataServer.get(this.apis.datasets, null, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                _this.datasetList = data;
                subject_1.next(data);
            });
            return subject_1;
        }
    };
    DataService.prototype.linkDataset = function (datasetId, chartConfig) {
        if (_.isUndefined(datasetId) || _.isUndefined(chartConfig)) {
            return rxjs_1.Observable.of(false);
        }
        else {
            var subject_2 = new rxjs_1.Subject();
            this.getDatasetList().subscribe(function (dsList) {
                var dataset = _.find(dsList, function (e) {
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
                var linkFunction = function (k) {
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
                            }
                            else if (k.id === e.id) {
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
                subject_2.next(true);
            });
            return subject_2;
        }
    };
    DataService.prototype.getDimensionConfig = function (array) {
        var result = [];
        if (array) {
            _.each(array, function (e) {
                if (_.isUndefined(e.group)) {
                    result.push(new data_type_1.FilterData(e.col, e.type, e.values, e.id));
                }
                else {
                    _.each(e.filters, function (f) {
                        result.push(new data_type_1.FilterData(e.col, e.type, e.values));
                    });
                }
            });
        }
        return result;
    };
    DataService.prototype.getDimensionValues = function (datasource, query, datasetId, colmunName, chartConfig, callback) {
        var _this = this;
        var owner = this;
        chartConfig = _.clone(chartConfig);
        this.linkDataset(datasetId, chartConfig).subscribe(function () {
            var cfg = undefined;
            if (chartConfig) {
                cfg = { rows: [], columns: [], filters: [] };
                cfg.rows = owner.getDimensionConfig(chartConfig.keys);
                cfg.columns = owner.getDimensionConfig(chartConfig.groups);
                cfg.filters = owner.getDimensionConfig(chartConfig.filters);
            }
            _this.dataServer.post('dimension-values', {
                datasourceId: datasource,
                query: JSON.stringify(query),
                datasetId: datasetId,
                colmunName: colmunName,
                cfg: JSON.stringify(cfg),
            }, request_options_1.REQUEST_OPTIONS).subscribe(callback);
        });
    };
    DataService.prototype.getConfiguration = function (chartConfig) {
        var cfg = {
            rows: [],
            columns: [],
            filters: [],
            values: []
        };
        var dataSeries = this.getDataSeriesViaConfig(chartConfig);
        cfg.rows = this.getDimensionConfig(chartConfig.keys);
        cfg.columns = this.getDimensionConfig(chartConfig.groups);
        cfg.filters = this.getDimensionConfig(chartConfig.filters);
        cfg.filters = cfg.filters.concat(this.getDimensionConfig(chartConfig.boardFilters));
        cfg.filters = cfg.filters.concat(this.getDimensionConfig(chartConfig.boardWidgetFilters));
        cfg.values = _.map(dataSeries, function (s) {
            return { column: s.name, aggType: s.aggregate };
        });
        return cfg;
    };
    DataService.prototype.getDataSeries = function (datasource, query, datasetId, chartConfig, callback, reload) {
        var _this = this;
        var queryData = {
            datasourceId: datasource,
            datasetId: datasetId,
            reportId: this.route.snapshot.queryParams.id,
            query: JSON.stringify(query),
            cfg: JSON.stringify(this.getConfiguration(chartConfig)),
            reload: reload
        };
        var range = this.route.snapshot.queryParams.range;
        if (range) {
            range = range.split('_');
            queryData.beginTime = range[0];
            queryData.endTime = range[1];
        }
        chartConfig = _.clone(chartConfig);
        this.updateService.updateConfig(chartConfig);
        this.linkDataset(datasetId, chartConfig).subscribe(function () {
            _this.dataServer.post(_this.apis.aggregate, queryData, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                var result = _this.castRawData2Series(data, chartConfig);
                result.chartConfig = chartConfig;
                if (!_.isUndefined(datasetId)) {
                    _this.getDrillConfig(datasetId, chartConfig).subscribe(function (c) {
                        result.drill = { config: c };
                        callback(result);
                    });
                }
                else {
                    callback(result);
                }
            });
        });
    };
    ;
    DataService.prototype.getDrillPath = function (datasetId, id) {
        var subject = new rxjs_1.Subject();
        this.getDatasetList().subscribe(function (dsList) {
            var dataset = _.find(dsList, function (e) {
                return e.id === datasetId;
            });
            var path = [];
            var level;
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
                };
            });
            subject.next(path);
        });
        return subject;
    };
    ;
    DataService.prototype.getDrillConfig = function (datasetId, chartConfig) {
        var subject = new rxjs_1.Subject();
        this.getDatasetList().subscribe(function (dsList) {
            var drillConfig = {};
            var dataset = _.find(dsList, function (e) {
                return e.id === datasetId;
            });
            if (!dataset.data.schema || dataset.data.schema.dimension.length === 0) {
                subject.next(drillConfig);
                return;
            }
            var _f = function (array) {
                _.each(array, function (c, i_array) {
                    var level;
                    var i_level;
                    var prevIsInLevel = false;
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
                    var prevDrilled = +i_array > 0 && array[+i_array - 1].values.length === 1 && array[+i_array - 1].type === '=';
                    var nextIsInLevel = false;
                    if (+i_array < array.length - 1 && i_level < level.columns.length - 1) {
                        nextIsInLevel = array[i_array + 1].id === level.columns[i_level + 1].id;
                    }
                    var isLastLevel = i_level === level.columns.length - 1;
                    var drillDownExistIdx = 0;
                    var drillDownExist = _.find(array, function (e, i) {
                        if (i_level < level.columns.length - 1 && level.columns[i_level + 1].id === e.id) {
                            drillDownExistIdx = i;
                            return true;
                        }
                    });
                    // if next level exist in array,the level must be the next of current
                    var drillDown = drillDownExist ? drillDownExistIdx === i_array + 1 : true;
                    var up = i_level > 0 && +i_array > 0 && prevIsInLevel && (+i_array === array.length - 1 || !nextIsInLevel) && prevDrilled;
                    var down = (nextIsInLevel || !isLastLevel) && drillDown && (!prevIsInLevel || (array[+i_array - 1].type === '=' && array[+i_array - 1].values.length === 1));
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
    };
    DataService.prototype.viewQuery = function (params, callback) {
        var _this = this;
        var owner = this;
        params.config = tslib_1.__assign({}, params.config);
        this.updateService.updateConfig(params.config);
        this.linkDataset(params.datasetId, params.config).subscribe(function () {
            var dataSeries = owner.getDataSeriesViaConfig(params.config);
            var cfg = {
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
            _this.dataServer.post('aggregate-query', {
                datasourceId: params.datasource,
                query: JSON.stringify(params.query),
                datasetId: params.datasetId,
                cfg: JSON.stringify(cfg),
            }, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                callback(data[0]);
            });
        });
    };
    DataService.prototype.getColumns = function (option) {
        this.dataServer.post('columns', {
            datasourceId: option.datasource,
            query: option.query ? JSON.stringify(option.query) : null,
            datasetId: option.datasetId,
            reload: option.reload
        }, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
            option.callback(data);
        });
    };
    DataService.prototype.getDataSeriesViaConfig = function (chartConfig) {
        var owner = this;
        var result = [];
        _.each(chartConfig.values, function (v) {
            _.each(v.cols, function (c) {
                var series = owner.configToDataSeries(c);
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
    };
    DataService.prototype.configToDataSeries = function (config) {
        switch (config.type) {
            case 'exp':
                return this.getExpSeries(config.exp);
            default:
                return [{
                        name: config.col,
                        aggregate: config.aggregate_type
                    }];
        }
    };
    DataService.prototype.getExpSeries = function (exp) {
        return this.parserExp(exp).aggs;
    };
    DataService.prototype.filter = function (cfg, iv) {
        if (!cfg.f_values || !cfg.f_type) {
            return true;
        }
        var v = cfg.f_values[0];
        var a = v;
        var b = cfg.f_values[1];
        var params = this.toNumber(iv, v);
        switch (cfg.f_type) {
            case '=':
            case 'eq':
                for (var i = 0; i < cfg.f_values.length; i++) {
                    if (iv === cfg.f_values[i]) {
                        return true;
                    }
                }
                return cfg.f_values.length === 0;
            case '≠':
            case 'ne':
                for (var i = 0; i < cfg.f_values.length; i++) {
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
    };
    DataService.prototype.toNumber = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        var arr = _.isArray(args[0]) ? args[0] : args;
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var a = Number(arr[i]);
            if (isNaN(a)) {
                return arr;
            }
            else {
                result.push(a);
            }
        }
        return result;
    };
    /**
     * Cast the aggregated raw data into data series
     * @param rawData
     * @param chartConfig
     */
    DataService.prototype.castRawData2Series = function (aggData, chartConfig) {
        var owner = this;
        var castedKeys = new Array();
        var castedGroups = new Array();
        var joinedKeys = {};
        var joinedGroups = {};
        var newData = {};
        var getIndex = function (columnList, col) {
            var result = new Array();
            if (col) {
                var _loop_3 = function (j) {
                    var idx = _.find(columnList, function (e) {
                        return e.name === col[j];
                    });
                    result.push(idx.index);
                };
                for (var j = 0; j < col.length; j++) {
                    _loop_3(j);
                }
            }
            return result;
        };
        var keysIdx = getIndex(aggData.columnList, _.map(chartConfig.keys, function (e) {
            return e.col;
        }));
        var keysSort = _.map(chartConfig.keys, function (e) {
            return e.sort;
        });
        var groupsIdx = getIndex(aggData.columnList, _.map(chartConfig.groups, function (e) {
            return e.col;
        }));
        var groupsSort = _.map(chartConfig.groups, function (e) {
            return e.sort;
        });
        var valueSeries = _.filter(aggData.columnList, function (e) {
            return e.aggType;
        });
        var _loop_1 = function (i) {
            // 组合keys
            var newKey = owner.getRowElements(aggData.data[i], keysIdx);
            var jk = newKey.join('-');
            if (_.isUndefined(joinedKeys[jk])) {
                castedKeys.push(newKey);
                joinedKeys[jk] = true;
            }
            // 组合groups
            var group = owner.getRowElements(aggData.data[i], groupsIdx);
            var newGroup = group.join('-');
            if (_.isUndefined(joinedGroups[newGroup])) {
                castedGroups.push(group);
                joinedGroups[newGroup] = true;
            }
            // pick the raw values into coordinate cell and then use aggregate function to do calculate
            _.each(valueSeries, function (dSeries) {
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
        };
        for (var i = 0; i < aggData.data.length; i++) {
            _loop_1(i);
        }
        // sort dimension
        var getSort = function (sort) {
            return function (a, b) {
                var r = 0;
                var j = 0;
                for (; j < a.length; j++) {
                    if (!sort[j]) {
                        continue;
                    }
                    if (a[j] === b[j]) {
                        r = 0;
                        continue;
                    }
                    var params = owner.toNumber(a[j], b[j]);
                    r = (params[0] > params[1]) ? 1 : -1;
                    if (sort[j] === 'desc') {
                        r = r * -1;
                    }
                    break;
                }
                return r;
            };
        };
        castedKeys.sort(getSort(keysSort));
        castedGroups.sort(getSort(groupsSort));
        //
        var castedAliasSeriesName = new Array();
        var aliasSeriesConfig = {};
        var aliasData = new Array();
        var valueSort = undefined;
        var valueSortArr = [];
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
                var p = owner.toNumber(a.v, b.v);
                if ((p[0] < p[1]) ^ valueSort === 'asc') {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            var tk_1 = castedKeys.slice();
            _.each(valueSortArr, function (e, i) {
                castedKeys[i] = tk_1[e.i];
            });
        }
        _.each(castedGroups, function (group) {
            _.each(chartConfig.values, function (value, vIdx) {
                _.each(value.cols, function (series) {
                    var seriesName = series.alias ? series.alias : series.col;
                    var newSeriesName = seriesName;
                    if (group && group.length > 0) {
                        var a = [].concat(group);
                        a.push(seriesName);
                        newSeriesName = a.join('-');
                        castedAliasSeriesName.push(a);
                    }
                    else {
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
        var _loop_2 = function (i) {
            var s = 0;
            var f = true;
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
                                    aliasData[s][i] = 0;
                                }
                                aliasData[s][i] = common_util_1.CommonUtil.dataFormat(aliasData[s][i]);
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
            out_i_1 = i;
        };
        var out_i_1;
        for (var i = 0; i < castedKeys.length; i++) {
            _loop_2(i);
            i = out_i_1;
        }
        return {
            keys: castedKeys,
            series: castedAliasSeriesName,
            data: aliasData,
            seriesConfig: aliasSeriesConfig
        };
    };
    DataService.prototype.getDateString = function (date) {
        return date.year + '' + (date.month < 10 ? '0' : '') + date.month + (date.day < 10 ? '0' : '') + date.day;
    };
    DataService.prototype.getConfigs = function (board) {
        var _this = this;
        var configs = [];
        if (board && board.layout) {
            board.layout.rows.forEach(function (row) {
                if (!row.widgets) {
                    return;
                }
                row.widgets.forEach(function (widget) {
                    try {
                        configs.push(_this.getConfiguration(widget.widget.data.config));
                    }
                    catch (e) {
                        console.error('ERROR ---------- DataService getConfigs');
                        console.error(e);
                    }
                });
            });
        }
        return configs;
    };
    DataService.prototype.parserExp = function (rawExp) {
        var evalExp = rawExp;
        var _temp = [];
        var aggs = [];
        var names = []; // expression text in aggreagtion function, could be a columnName or script
        evalExp = evalExp.trim().replace(/[\n|\r|\r\n]/g, '');
        _.each(evalExp.match(/'.*?'/g), function (qutaText) {
            evalExp = evalExp.replace(qutaText, '_#' + _temp.length);
            _temp.push(qutaText);
        });
        _.each(evalExp.match(/(sum|avg|count|max|min|distinct)\('?.*?'?\)/g), function (aggUnit) {
            var aggregate = aggUnit.substring(0, aggUnit.indexOf('('));
            var name = aggUnit.substring(aggUnit.indexOf('(') + 1, aggUnit.indexOf(')'));
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
    };
    DataService.prototype.castSeriesData = function (series, group, castedKeys, newData, iterator) {
        switch (series.type) {
            case 'exp':
                var runExp = this.compileExp(series.exp);
                for (var i = 0; i < castedKeys.length; i++) {
                    iterator(runExp(newData[group], castedKeys[i].join('-')), i);
                }
                break;
            default:
                for (var i = 0; i < castedKeys.length; i++) {
                    iterator(newData[group][series.col][series.aggregate_type][castedKeys[i].join('-')], i);
                }
                break;
        }
    };
    DataService.prototype.aggregate = function (data, fnc) {
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
    };
    DataService.prototype.aggregate_sum = function (data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            var f = parseFloat(data[i]);
            if (f) {
                sum += f;
            }
        }
        return sum;
    };
    DataService.prototype.aggregate_count = function (data) {
        return data.length;
    };
    DataService.prototype.aggregate_avg = function (data) {
        var sum = 0;
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            var f = parseFloat(data[i]);
            if (f) {
                sum += f;
                count++;
            }
        }
        return count === 0 ? 0 : sum / count;
    };
    DataService.prototype.getHeaderIndex = function (chartData, col) {
        var result = new Array();
        if (col) {
            for (var j = 0; j < col.length; j++) {
                var idx = _.indexOf(chartData[0], col[j]);
                result.push(idx);
            }
        }
        return result;
    };
    DataService.prototype.getRowElements = function (row, elmIdxs) {
        var arr = new Array();
        for (var j = 0; j < elmIdxs.length; j++) {
            var elm = row[elmIdxs[j]];
            arr.push(elm);
        }
        return arr;
    };
    DataService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_2.ApiServer,
            update_service_1.UpdateService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;

//# sourceMappingURL=../../sourcemaps/src/data/data.service.js.map
