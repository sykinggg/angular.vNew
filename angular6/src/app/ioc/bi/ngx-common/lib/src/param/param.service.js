"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var rxjs_1 = require("rxjs");
var core_3 = require("core-services/core");
var request_options_1 = require("../request-options");
var ParamService = /** @class */ (function () {
    function ParamService(route, datePipe, translateService, dataServer) {
        this.route = route;
        this.datePipe = datePipe;
        this.translateService = translateService;
        this.dataServer = dataServer;
        this.initParamsSubject = new rxjs_1.Subject();
        this.quantity = 0;
    }
    ParamService.prototype.initParam = function (param, rows) {
        var _this = this;
        param.selects = [];
        if (!param.type) {
            param.type = '=';
        }
        if (!param.values) {
            console.log('param.values = []');
            param.values = [];
        }
        if (!param.paramType) {
            param.paramType = 'selector';
        }
        switch (param.paramType) {
            case 'slider':
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
                break;
            case 'date_range':
                var range = this.route.snapshot.queryParams.range;
                if (range) {
                    param.values = range.split('_').map(function (item) { return parseInt(item); });
                }
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
                break;
            case 'selector':
                var requestURL = void 0;
                param.value = '';
                switch (param.col[0].column) {
                    case 'areaid':
                        requestURL = 'param-area';
                        break;
                    case 'ac_base_mac':
                        requestURL = 'param-ac';
                        break;
                    case 'userid':
                        requestURL = 'param-user';
                        break;
                }
                if (requestURL) {
                    this.dataServer.request(requestURL, null, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                        param.selects = data;
                        param.values = param.selects.map(function (item) { return item.value; });
                        _this.quantity--;
                        _this.initParamsSubject.next(_this.quantity);
                    });
                }
                else {
                    this.quantity--;
                    this.initParamsSubject.next(this.quantity);
                }
                break;
            default:
                var getParamsFromWidget_1 = function (widgets, col) {
                    var params;
                    widgets.some(function (widget) {
                        if (widget.widget.id === col.widgetId) {
                            params = {
                                datasourceId: widget.widget.data.datasource,
                                query: JSON.stringify(widget.widget.data.query),
                                datasetId: null
                            };
                            return true;
                        }
                        return false;
                    });
                    return params;
                };
                param.col.forEach(function (c) {
                    var p;
                    if (!c.datasetId) {
                        if (rows instanceof Array) {
                            rows.some(function (row) {
                                p = getParamsFromWidget_1(row.widgets, c);
                                return !!p;
                            });
                        }
                        else {
                            p = getParamsFromWidget_1(rows.widgets, c);
                        }
                    }
                    else {
                        p = {
                            datasourceId: null,
                            query: null,
                            datasetId: c.datasetId
                        };
                    }
                    _this.dataServer.post('dimension-values', tslib_1.__assign({}, p, { colmunName: c.column }), request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                        data.forEach(function (s) {
                            if (_.indexOf(param.selects, s) < 0) {
                                param.selects.push(s);
                            }
                        });
                    });
                });
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
        }
    };
    ParamService.prototype.getParamTitle = function (param) {
        var _this = this;
        var description;
        if (param.paramType === 'selector') {
            if (param.value === '') {
                description = param.name + ' ' + param.type + ' (' + this.translateService.instant('COMMON.ALL') + ')';
            }
            else {
                description = param.name + ' ' + param.type + ' (' + param.values.map(function (value) {
                    var name;
                    param.selects.some(function (option) {
                        if (value === option.value) {
                            name = option.name;
                            return true;
                        }
                        return false;
                    });
                    return name;
                }) + ')';
            }
        }
        else {
            switch (param.type) {
                case '=':
                case '≠':
                    description = param.name + ' ' + param.type + ' (' + param.values + ')';
                    break;
                case '>':
                case '<':
                case '≥':
                case '≤':
                    description = param.name + ' ' + param.type + ' ' + param.values;
                    break;
                case '(a,b]':
                case '[a,b)':
                case '(a,b)':
                case '[a,b]':
                    var leftBrackets = param.type.split('a')[0];
                    var rightBrackets = param.type.split('b')[1];
                    try {
                        if (param.paramType === 'slider') {
                            description = param.name + ' between ' + leftBrackets + param.values.map(function (item) {
                                var datePattern = /(^\d{4})(\d{2})(\d{2})/;
                                return item.replace(datePattern, '$1-$2-$3');
                            }).join(' , ') + rightBrackets;
                        }
                        else {
                            description = param.name + ' between ' + leftBrackets + param.values.map(function (item) {
                                return _this.datePipe.transform(new Date(parseInt(item)), 'yyyy-MM-dd HH:mm:ss', 'UTC');
                            }).join(' , ') + rightBrackets;
                        }
                    }
                    catch (error) {
                        description = param.name + ' between ' + leftBrackets + param.values.join(',') + rightBrackets;
                    }
                    break;
                default:
                    description = param.name;
            }
        }
        return description;
    };
    ParamService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.DatePipe,
            core_2.TranslateService,
            core_3.ApiServer])
    ], ParamService);
    return ParamService;
}());
exports.ParamService = ParamService;

//# sourceMappingURL=../../sourcemaps/src/param/param.service.js.map
