"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var numbro = require("numbro");
var core_2 = require("@ngx-translate/core");
var kpiRender_service_1 = require("./render/kpiRender.service");
// import { CBoardKpiRender } from './render/kpiRender';
var html2canvas = require('html2canvas');
var ChartKpiService = /** @class */ (function () {
    function ChartKpiService(translate, cBoardKpiRender) {
        this.translate = translate;
        this.cBoardKpiRender = cBoardKpiRender;
    }
    ChartKpiService.prototype.render = function (containerDom, option, scope, persist) {
        var render = this.cBoardKpiRender.CBoardKpiRender(containerDom, option);
        var html = render.html(persist);
        if (scope) {
            containerDom.append($compile(html)(scope));
        }
        else {
            containerDom.html(html);
        }
        return render.realTimeTicket();
    };
    ;
    ChartKpiService.prototype.parseOption = function (data) {
        var option = {};
        var config = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;
        option.kpiValue = aggregate_data.length > 0 ? aggregate_data[0][0] : 'N/A';
        if (config.values[0].format) {
            option.kpiValue = numbro(option.kpiValue).format(config.values[0].format);
        }
        option.kpiName = config.values[0].name;
        option.style = config.values[0].style;
        option.edit = this.translate.instant("COMMON.EDIT");
        option.refresh = this.translate.instant("COMMON.REFRESH");
        return option;
    };
    ;
    ChartKpiService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
            kpiRender_service_1.CBoardKpiRenderService])
    ], ChartKpiService);
    return ChartKpiService;
}());
exports.ChartKpiService = ChartKpiService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartKpi.service.js.map
