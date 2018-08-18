"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var UpdateService = /** @class */ (function () {
    function UpdateService() {
    }
    UpdateService.prototype.updateConfig = function (config) {
        var toFilterConfig = function (e) {
            if (typeof e === 'string') {
                return {
                    col: e,
                    type: 'eq',
                    values: []
                };
            }
            return e;
        };
        config.keys = config.keys.map(toFilterConfig);
        config.groups = config.groups.map(toFilterConfig);
        if (!config.filters) {
            config.filters = [];
        }
        switch (config.chart_type) {
            case 'pie':
                // the new pie
                if (!config.groups) {
                    config.groups = [];
                }
                break;
            case 'line':
                if (!config.valueAxis) {
                    config.valueAxis = 'vertical';
                }
                break;
        }
    };
    UpdateService.prototype.updateBoard = function (board) {
        if (board.layout) {
            board.layout.rows.forEach(function (row) {
                if (!row.type) {
                    row.type = 'widget';
                }
            });
        }
    };
    UpdateService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], UpdateService);
    return UpdateService;
}());
exports.UpdateService = UpdateService;

//# sourceMappingURL=../../sourcemaps/src/data/update.service.js.map
