"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var BoardService = /** @class */ (function () {
    function BoardService(route) {
        this.route = route;
        this.applyParamsSubject = new Subject_1.Subject();
        this.widgetFilters = {};
        this.datasetFilters = {};
        this.relationFilters = {};
        this.board = {};
        this.relations = [];
    }
    BoardService.prototype.beforeFilter = function () {
        var _this = this;
        this.datasetFilters = {};
        this.widgetFilters = {};
        this.relationFilters = {};
        this.board.layout.rows.forEach(function (row) {
            if (row.params) {
                _this.paramToFilter(row.params);
            }
        });
        // 将点击的参数赋值到relationFilters中
        this.relations.forEach(function (relation) {
            if (relation.targetId && relation.params && relation.params.length > 0) {
                relation.params.forEach(function (param) {
                    var p = {
                        col: param.targetField,
                        type: '=',
                        values: [param.value]
                    };
                    if (!_this.relationFilters[relation.targetId]) {
                        _this.relationFilters[relation.targetId] = [];
                    }
                    _this.relationFilters[relation.targetId].push(p); // relation.targetId == widgetId
                });
            }
        });
    };
    BoardService.prototype.paramToFilter = function (params) {
        var _this = this;
        params.forEach(function (param) {
            // 将点击的参数赋值到看板上的参数中
            // '{'targetId':3,'params':[{'targetField':'logo','value':'iphone'},{'targetField':'logo1','value':'上海市'}]}' targetField==param.name
            var queryParam = _this.route.snapshot.params[param.name];
            if (queryParam) {
                param.values.push(queryParam.value);
            }
            if (!param.values.length) {
                return;
            }
            _.each(param.col, function (col) {
                var p = {
                    col: col.column,
                    type: param.type,
                    values: param.values
                };
                if (_.isUndefined(col.datasetId)) {
                    if (!_this.widgetFilters[col.widgetId]) {
                        _this.widgetFilters[col.widgetId] = [];
                    }
                    _this.widgetFilters[col.widgetId].push(p);
                }
                else {
                    if (!_this.datasetFilters[col.datasetId]) {
                        _this.datasetFilters[col.datasetId] = [];
                    }
                    _this.datasetFilters[col.datasetId].push(p);
                }
            });
        });
    };
    BoardService.prototype.injectFilter = function (widget) {
        var boardFilters = [];
        if (!_.isUndefined(this.widgetFilters[widget.id])) {
            _.each(this.widgetFilters[widget.id], function (e) {
                boardFilters.push(e);
            });
        }
        if (!_.isUndefined(this.datasetFilters[widget.data.datasetId])) {
            _.each(this.datasetFilters[widget.data.datasetId], function (e) {
                boardFilters.push(e);
            });
        }
        if (!_.isUndefined(this.relationFilters[widget.id])) {
            _.each(this.relationFilters[widget.id], function (e) {
                boardFilters.push(e);
            });
        }
        widget.data.config.boardFilters = boardFilters;
        return widget;
    };
    BoardService.prototype.initDsReloadStatus = function (reload) {
        var dsReloadStatus = {};
        if (!this.board || !this.board.layout || !this.board.layout.rows) {
            return {};
        }
        this.board.layout.rows.forEach(function (row) {
            if (!row.widgets) {
                return;
            }
            row.widgets.forEach(function (widget) {
                var dataSetId = widget.widget.data.datasetId;
                if (dataSetId !== undefined) {
                    dsReloadStatus[dataSetId] = reload;
                }
            });
        });
        return dsReloadStatus;
    };
    BoardService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], BoardService);
    return BoardService;
}());
exports.BoardService = BoardService;

//# sourceMappingURL=../../sourcemaps/src/board/board.service.js.map
