"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
// import { crossTable } from '../common/crossTable';
var crossTable_service_1 = require("../common/crossTable.service");
var _ = require("lodash");
var CBoardTableRenderService = /** @class */ (function () {
    function CBoardTableRenderService(crossTableService) {
        this.crossTableService = crossTableService;
    }
    CBoardTableRenderService.prototype.CBoardTableRender = function (jqContainer, options, drill) {
        this.container = jqContainer; // jquery object
        this.options = options;
        this.tall;
        this.drill = drill;
        var _this = this;
        $(this.container).resize(function (e) {
            _this.resize(e.target);
        });
        return this;
    };
    ;
    CBoardTableRenderService.prototype.resize = function (container) {
        var wrapper = $(container).find('.table_wrapper');
        wrapper.css('width', 'auto');
        if (wrapper.width() < $(container).width()) {
            wrapper.css('width', '100%');
        }
    };
    ;
    CBoardTableRenderService.prototype.do = function (tall, persist) {
        this.tall = tall;
        tall = _.isUndefined(tall) ? 500 : tall;
        var divHeight = tall - 110;
        var _this = this;
        var render = function (o, drillConfig) {
            _this.options = o;
            _this.drill.config = drillConfig;
            _this.do(_this.tall);
        };
        var args = {
            tall: divHeight,
            chartConfig: this.options.chartConfig,
            data: this.options.data,
            container: this.container,
            drill: this.drill,
            render: render
        };
        this.crossTableService.table(args);
        $(this.container).css({
            height: tall + "px"
        });
        this.resize(this.container);
        if (persist) {
            persist.data = this.options.data;
            persist.type = "table";
        }
        return render;
    };
    ;
    CBoardTableRenderService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [crossTable_service_1.CrossTableService])
    ], CBoardTableRenderService);
    return CBoardTableRenderService;
}());
exports.CBoardTableRenderService = CBoardTableRenderService;

//# sourceMappingURL=../../../sourcemaps/src/chart/render/tableRender.service.js.map
