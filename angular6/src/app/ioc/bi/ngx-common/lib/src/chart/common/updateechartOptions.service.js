"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var _ = require("lodash");
var chart_options_1 = require("../chart-options");
var UpdateEchartOptionsService = /** @class */ (function () {
    function UpdateEchartOptionsService() {
    }
    UpdateEchartOptionsService.prototype.updateEchartOptions = function (tuningOpt, rawOpt) {
        if (tuningOpt) {
            if (tuningOpt.dataZoom == true) {
                rawOpt.dataZoom = {
                    show: true,
                    start: 0,
                    end: 100
                };
            }
            // legend
            rawOpt.grid === undefined ? rawOpt.grid = _.clone(chart_options_1.CHART_BASIC_OPTION.grid) : null;
            if (tuningOpt.legendShow == false) {
                rawOpt.grid.top = '5%';
                rawOpt.legend.show = false;
            }
            else {
                rawOpt.legend === undefined ? rawOpt.legend = _.clone(chart_options_1.CHART_BASIC_OPTION.legend) : null;
                tuningOpt.legendX ? rawOpt.legend.x = tuningOpt.legendX : null;
                tuningOpt.legendY ? rawOpt.legend.y = tuningOpt.legendY : null;
                tuningOpt.legendOrient ? rawOpt.legend.orient = tuningOpt.legendOrient : null;
            }
            // grid
            if (tuningOpt.gridCustom == true) {
                tuningOpt.gridTop ? rawOpt.grid.top = tuningOpt.gridTop : null;
                tuningOpt.gridBottom ? rawOpt.grid.bottom = tuningOpt.gridBottom : null;
                tuningOpt.gridLeft ? rawOpt.grid.left = tuningOpt.gridLeft : null;
                tuningOpt.gridRight ? rawOpt.grid.right = tuningOpt.gridRight : null;
            }
        }
    };
    ;
    UpdateEchartOptionsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], UpdateEchartOptionsService);
    return UpdateEchartOptionsService;
}());
exports.UpdateEchartOptionsService = UpdateEchartOptionsService;

//# sourceMappingURL=../../../sourcemaps/src/chart/common/updateechartOptions.service.js.map
