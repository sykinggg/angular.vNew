"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var tableRender_service_1 = require("./render/tableRender.service");
var chartDataProcess_service_1 = require("./common/chartDataProcess.service");
// import {CBoardTableRender} from './render/tableRender';
// import {chartDataProcess} from './common/chartDataProcess';
// var chartDataProcessFun = chartDataProcess
var ChartTableService = /** @class */ (function () {
    function ChartTableService(cBoardTableRender, chartDataProcess) {
        this.cBoardTableRender = cBoardTableRender;
        this.chartDataProcess = chartDataProcess;
    }
    ChartTableService.prototype.render = function (containerDom, option, persist, drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        // scope ? height = scope.myheight - 20 : null;
        return this.cBoardTableRender.CBoardTableRender(containerDom, option, drill).do(height, persist);
    };
    ;
    ChartTableService.prototype.parseOption = function (data) {
        var tableOption = this.chartDataProcess.chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        return tableOption;
    };
    ;
    ChartTableService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [tableRender_service_1.CBoardTableRenderService,
            chartDataProcess_service_1.ChartDataProcessService])
    ], ChartTableService);
    return ChartTableService;
}());
exports.ChartTableService = ChartTableService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartTable.service.js.map
