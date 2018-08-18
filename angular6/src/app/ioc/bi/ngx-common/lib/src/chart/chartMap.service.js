"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var cBoardMapRender_service_1 = require("./render/cBoardMapRender.service");
var chartDataProcess_service_1 = require("./common/chartDataProcess.service");
var ChartMapService = /** @class */ (function () {
    function ChartMapService(cBoardMapRender, chartDataProcess) {
        this.cBoardMapRender = cBoardMapRender;
        this.chartDataProcess = chartDataProcess;
    }
    ChartMapService.prototype.render = function (containerDom, option, scope, persist, drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight : null;
        return this.cBoardMapRender.CBoardMapRender(containerDom, option, drill).do(height, persist);
    };
    ;
    ChartMapService.prototype.parseOption = function (data) {
        var mapOption = this.chartDataProcess.chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        return mapOption;
    };
    ;
    ChartMapService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [cBoardMapRender_service_1.CBoardMapRenderService,
            chartDataProcess_service_1.ChartDataProcessService])
    ], ChartMapService);
    return ChartMapService;
}());
exports.ChartMapService = ChartMapService;

//# sourceMappingURL=../../sourcemaps/src/chart/chartMap.service.js.map
