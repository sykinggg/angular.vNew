"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var request_options_1 = require("../request-options");
var Template = /** @class */ (function () {
    function Template(componentFactoryResolver, route, dataServer, dataService, boardService, paramService, chartService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.route = route;
        this.dataServer = dataServer;
        this.dataService = dataService;
        this.boardService = boardService;
        this.paramService = paramService;
        this.chartService = chartService;
        this.apis = {
            layout: 'board-data'
        };
        this.paramsInitialized = false;
        this.loading = true;
        this.intervals = [];
        this.timeline = [];
        this.timelineColor = [
            'info',
            'danger',
            'success',
            'warning',
            'secondary',
            'primary',
            'dark'
        ];
        this.board = {};
    }
    Template.prototype.ngOnInit = function () {
        var _this = this;
        this.boardService.applyParamsSubject.pipe(operators_1.debounceTime(800)).subscribe(function () {
            _this.applyParamFilter();
        });
        this.paramService.initParamsSubject.subscribe(function (data) {
            if (data === 0) {
                _this.loadWidget(false);
                _this.paramsInitialized = true;
            }
        });
        this.dataService.getDatasetList().subscribe(function (data) {
            _this.datasetList = data;
        });
        this.route.params.subscribe(function (params) {
            if (params.id) {
                _this.intervals.forEach(function (interval) {
                    interval.unsubscribe();
                });
                _this.initComponent();
                _this.load(false);
            }
        });
    };
    Template.prototype.ngOnDestroy = function () {
    };
    Template.prototype.getID = function () {
        return this.route.snapshot.params['id'];
    };
    Template.prototype.initComponent = function () {
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
    };
    Template.prototype.applyParamFilter = function () {
        var _this = this;
        this.boardService.beforeFilter();
        this.board.layout.rows.forEach(function (row) {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach(function (w) {
                try {
                    _this.chartService.realTimeRender(w.realTimeTicket, _this.boardService.injectFilter(w.widget).data, null, w, true);
                }
                catch (e) {
                    console.error(e);
                }
            });
        });
    };
    Template.prototype.load = function (reload) {
        var _this = this;
        var subject = new rxjs_1.Subject();
        this.loading = true;
        this.intervals.forEach(function (interval) {
            interval.unsubscribe();
        });
        this.intervals = [];
        this.dataServer.get(this.apis.layout, {
            id: this.getID()
        }, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
            _this.intervalGroup = {};
            _this.loading = false;
            _this.board = _this.boardService.board = data;
            _this.board.layout.rows.forEach(function (row) {
                if (row.params) {
                    _this.paramService.quantity += row.params.length;
                }
            });
            if (_this.board.layout.type === 'timeline') {
                _this.groupTimeline();
            }
            if (_this.paramService.quantity === 0) {
                _this.loadWidget(reload);
                _this.paramsInitialized = true;
            }
            subject.next(_this.board);
        });
        return subject;
    };
    Template.prototype.groupTimeline = function () {
        var _this = this;
        var group = undefined;
        this.timeline = [];
        this.board.layout.rows.forEach(function (row, idx) {
            if (idx === 0) {
                return;
            }
            row.show = false;
            if (row.node === 'parent') {
                if (group) {
                    _this.timeline.push(group);
                }
                group = [];
                row.show = true;
            }
            group.push(row);
        });
        this.timeline.push(group);
    };
    Template.prototype.loadWidget = function (reload) {
        var _this = this;
        var dsReloadStatus = this.boardService.initDsReloadStatus(reload);
        this.boardService.beforeFilter();
        this.board.layout.rows.forEach(function (row) {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach(function (widget) {
                if (!_.isUndefined(widget.hasRole) && !widget.hasRole) {
                    return;
                }
                var dataSetId = widget.widget.data.datasetId;
                // avoid repeat load offline dataset data
                if (dataSetId !== undefined && reload) {
                    dsReloadStatus[dataSetId] = false;
                }
                if (_this.board.layout.type === 'timeline') {
                    if (row.show) {
                        widget.show = true;
                    }
                }
                else {
                    widget.show = true;
                }
                // real time load task
                var w = widget.widget.data;
                var ds = _.find(_this.datasetList, function (e) {
                    return e.id === w.datasetId;
                });
                if (ds && ds.data.interval && ds.data.interval > 0) {
                    if (!_this.intervalGroup[w.datasetId] && !widget.sourceId) {
                        var timer = rxjs_1.Observable.interval(ds.data.interval * 1000);
                        _this.intervalGroup[w.datasetId] = [];
                        _this.intervals.push(timer);
                        timer.subscribe(function () {
                            // Refresh Params
                            _this.boardService.beforeFilter();
                            _.each(_this.intervalGroup[w.datasetId], function (e) {
                                e();
                            });
                        });
                    }
                    _this.intervalGroup[w.datasetId].push(function () {
                        try {
                            if (widget.show) {
                                _this.chartService.realTimeRender(widget.realTimeTicket, _this.boardService.injectFilter(widget.widget).data);
                                if (widget.modalRealTimeTicket) {
                                    _this.chartService.realTimeRender(widget.modalRealTimeTicket, _this.boardService.injectFilter(widget.widget).data, widget.modalRealTimeOption.optionFilter, null);
                                }
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    });
                }
            });
        });
    };
    return Template;
}());
exports.Template = Template;

//# sourceMappingURL=../../sourcemaps/src/board/template.js.map
