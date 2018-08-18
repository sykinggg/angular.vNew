"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var chart_service_1 = require("../chart/chart.service");
var board_service_1 = require("./board.service");
var ModalWidgetComponent = /** @class */ (function () {
    function ModalWidgetComponent(elementRef, boardService, chartService) {
        this.elementRef = elementRef;
        this.boardService = boardService;
        this.chartService = chartService;
        this.loading = false;
    }
    ModalWidgetComponent.prototype.afterDialogInit = function (dialog, modalContent) {
        var _this = this;
        var optionFilter = function (option) {
            option.toolbox = {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: true
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    dataZoom: {
                        show: true
                    },
                    restore: {
                        show: true
                    }
                }
            };
        };
        this.loading = true;
        this.widget = dialog.data.widget;
        this.chartService.render($('.widget-view', this.elementRef.nativeElement), this.boardService.injectFilter(this.widget.widget).data, optionFilter).subscribe(function (data) {
            _this.widget.modalRealTimeTicket = data;
            _this.loading = false;
        });
        this.widget.modalRealTimeOption = {
            optionFilter: optionFilter
        };
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalWidgetComponent.prototype, "widget", void 0);
    ModalWidgetComponent = tslib_1.__decorate([
        core_1.Component({
            template: '<div class=\"widget-view\" style=\"height: calc(100vh - 300px);\"><div class=\"text-center flex-column d-flex\" style=\"height: 100%;\" *ngIf=\"loading\"><div class=\"row h-50\"><div class=\"col\">&nbsp;</div><div class=\"col\">&nbsp;</div></div><i class=\"fa fa-spinner fa-pulse fa-3x text-muted m-2\"></i><div class=\"row h-50\"><div class=\"col\">&nbsp;</div><div class=\"col\">&nbsp;</div></div></div></div>'
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.ElementRef,
            board_service_1.BoardService,
            chart_service_1.ChartService])
    ], ModalWidgetComponent);
    return ModalWidgetComponent;
}());
exports.ModalWidgetComponent = ModalWidgetComponent;

//# sourceMappingURL=../../sourcemaps/src/board/modal-widget.component.js.map
