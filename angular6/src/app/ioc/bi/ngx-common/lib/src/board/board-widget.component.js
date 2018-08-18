"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("core-services/core");
var chart_service_1 = require("../chart/chart.service");
var board_service_1 = require("./board.service");
var modal_widget_component_1 = require("./modal-widget.component");
var BoardWidgetComponent = /** @class */ (function () {
    function BoardWidgetComponent(componentFactoryResolver, elementRef, router, dialogService, boardService, chartService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.elementRef = elementRef;
        this.router = router;
        this.dialogService = dialogService;
        this.boardService = boardService;
        this.chartService = chartService;
        this.readonly = false;
        this.loading = false;
    }
    BoardWidgetComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.height = (this.row.height ? (this.row.height - 44) : 300 + 'px');
        switch (this.widget.widget.data.config.chart_type) {
            case 'map':
                this.viewType = 'chartContent';
                break;
            case 'kpi':
                this.height = 'auto';
                this.viewType = 'kpiContent';
                break;
            case 'table':
                this.viewType = 'chartContent';
                break;
            default:
                this.viewType = 'echartContent';
        }
        this.render();
    };
    BoardWidgetComponent.prototype.modalTable = function (widget) {
        this.dialogService.show({
            title: widget.name,
            contentComponent: modal_widget_component_1.ModalWidgetComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                widget: widget
            }
        }, {
            size: 'lg'
        }).result.then(function (result) {
            console.log("Closed with: " + result);
        }, function (reason) {
            console.log("Dismissed " + reason);
        });
    };
    BoardWidgetComponent.prototype.modalChart = function (widget) {
        this.dialogService.show({
            title: widget.name,
            contentComponent: modal_widget_component_1.ModalWidgetComponent,
            componentFactoryResolver: this.componentFactoryResolver,
            data: {
                widget: widget
            },
        }, {
            size: 'lg'
        }).result.then(function (result) {
            if (widget.modalRealTimeTicket) {
                delete widget.modalRealTimeTicket;
            }
            if (widget.modalRealTimeOption) {
                delete widget.modalRealTimeOption;
            }
        }, function (reason) {
            console.log("Dismissed " + reason);
        });
    };
    BoardWidgetComponent.prototype.reload = function () {
        if (this.row.params) {
            this.boardService.paramToFilter(this.row.params);
        }
        this.render();
    };
    BoardWidgetComponent.prototype.config = function () {
        var navigationExtras = {
            queryParams: {
                id: this.widget.widget.id
            }
        };
        this.router.navigate(['/admin/config/widget'], navigationExtras);
    };
    BoardWidgetComponent.prototype.render = function (optionFilter) {
        var _this = this;
        var needReload = false;
        var dataSetId = this.widget.widget.data.datasetId;
        var dsReloadStatus = this.boardService.initDsReloadStatus(needReload);
        var widgetData = this.boardService.injectFilter(this.widget.widget).data;
        // 百度地图特殊处理
        var charType = widgetData.config.chart_type;
        this.loading = true;
        this.widget.show = true;
        // avoid repeat load offline dataset data
        if (dataSetId !== undefined) {
            needReload = dsReloadStatus[dataSetId] ? true : false;
            dsReloadStatus[dataSetId] = false;
        }
        if (charType === 'chinaMapBmap') {
            this.chartService.render($('.widget-view', this.elementRef.nativeElement), widgetData, optionFilter, needReload);
            this.loading = false;
        }
        else {
            this.chartService.render($('.widget-view', this.elementRef.nativeElement), widgetData, optionFilter, needReload, null, this.widget.relations).subscribe(function (data) {
                _this.widget.realTimeTicket = data;
                _this.loading = false;
            });
        }
        this.widget.realTimeOption = {
            ptionFilter: optionFilter
        };
    };
    tslib_1.__decorate([
        core_1.ViewChild('widgetView', { read: core_1.ViewContainerRef }),
        tslib_1.__metadata("design:type", core_1.ViewContainerRef)
    ], BoardWidgetComponent.prototype, "widgetView", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BoardWidgetComponent.prototype, "widget", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BoardWidgetComponent.prototype, "row", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], BoardWidgetComponent.prototype, "configurable", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BoardWidgetComponent.prototype, "readonly", void 0);
    BoardWidgetComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'dashboard-widget',
            template: '<div class=\"border border-light\" [ngClass]=\"{\'p-2\': viewType !== \'kpiContent\'}\"><h3 class=\"d-inline-block h6\" *ngIf=\"viewType !== \'kpiContent\'\"><i class=\"fa fa-chart-bar\" aria-hidden=\"true\"></i> {{widget.name}}</h3><div class=\"float-right\" *ngIf=\"!readonly && viewType !== \'kpiContent\'\"><a href=\"javascript:void(0);\" role=\"button\" *ngIf=\"(widget.show && loading === false && viewType === \'chartContent\')\" (click)=\"modalTable(widget)\"><i class=\"fa fa-expand fa-xs\" aria-hidden=\"true\"></i></a> <a href=\"javascript:void(0);\" role=\"button\" *ngIf=\"(widget.show && loading === false && viewType === \'echartContent\')\" (click)=\"modalChart(widget)\"><i class=\"fa fa-expand fa-xs\" aria-hidden=\"true\"></i></a> <a href=\"javascript:void(0);\" role=\"button\" *ngIf=\"(widget.show && loading === false)\" (click)=\"reload(widget)\"><i class=\"fa fa-sync-alt fa-xs\" aria-hidden=\"true\"></i></a> <a href=\"javascript:void(0);\" role=\"button\" *ngIf=\"(configurable && widget.hasRole !== false)\" (click)=\"config(widget)\"><i class=\"fa fa-wrench fa-xs\" aria-hidden=\"true\"></i></a> <a href=\"javascript:void(0);\" role=\"button\" (click)=\"widget.isCollapsed = !widget.isCollapsed\"><i class=\"fa fa-xs\" aria-hidden=\"true\" [ngClass]=\"{\'fa-minus\': !widget.isCollapsed, \'fa-plus\': widget.isCollapsed}\"></i></a></div><div class=\"clearfix\"></div><div [ngbCollapse]=\"widget.isCollapsed\"><div [id]=\"widget.widgetId\" class=\"widget-view\" [ngClass]=\"{\'d-none\': widget.hasRole === false || !widget.show}\" [ngStyle]=\"{height: height}\"><div class=\"text-center flex-column d-none d-sm-flex\" *ngIf=\"loading\" [ngStyle]=\"{height: height}\"><div class=\"row h-50\"><div class=\"col\">&nbsp;</div><div class=\"col\">&nbsp;</div></div><i class=\"fa fa-spinner fa-pulse fa-3x text-muted m-2\"></i><div class=\"row h-50\"><div class=\"col\">&nbsp;</div><div class=\"col\">&nbsp;</div></div></div></div><div *ngIf=\"widget.hasRole === false\" [ngStyle]=\"{height: height}\">{{\'ADMIN.CONTACT_ADMIN\' | translate}}<ul><li *ngFor=\"let ri of widget.roleInfo\">{{ri.type | translate}} {{ri.name}}</li></ul></div><div class=\"p-1 position-absolute text-center fa-sm\" style=\"left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.1);\" *ngIf=\"!readonly && widget.show && !loading && viewType === \'kpiContent\'\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"reload(widget)\">{{\"COMMON.REFRESH\" | translate}} <i class=\"fa fa-sync-alt\"></i></a> <a class=\"ml-2\" href=\"javascript:void(0);\" role=\"button\" (click)=\"config(widget)\" *ngIf=\"configurable\">{{\"COMMON.EDIT\" | translate}} <i class=\"fa fa-wrench\"></i></a></div></div></div>'
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ElementRef,
            router_1.Router,
            core_2.DialogService,
            board_service_1.BoardService,
            chart_service_1.ChartService])
    ], BoardWidgetComponent);
    return BoardWidgetComponent;
}());
exports.BoardWidgetComponent = BoardWidgetComponent;

//# sourceMappingURL=../../sourcemaps/src/board/board-widget.component.js.map
