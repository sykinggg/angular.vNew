"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("core-services/core");
var request_options_1 = require("../request-options");
var data_type_1 = require("../data/data-type");
var data_service_1 = require("../data/data.service");
var param_service_1 = require("../param/param.service");
var menu_service_1 = require("../menu/menu.service");
var GenerateReportComponent = /** @class */ (function () {
    function GenerateReportComponent(router, dataServer, menuService, dataService, paramService) {
        this.router = router;
        this.dataServer = dataServer;
        this.menuService = menuService;
        this.dataService = dataService;
        this.paramService = paramService;
        this.formData = {
            reportName: '',
            statType: '2',
            email: '',
            recipients: []
        };
    }
    GenerateReportComponent.prototype.afterDialogInit = function (dialog, modalContent) {
        var _this = this;
        var oldClose = dialog.modal.close;
        this.board = dialog.data;
        this.formData.reportName = this.board.reportName;
        this.formData.statType = this.board.statType || '2';
        this.formData.recipients = this.board.recipients ? this.board.recipients.split(',') : [];
        dialog.modal.close = function () {
            if (_this.formData.reportName.trim()) {
                _this.dataServer.post(_this.board.reportId ? 'edit-report' : 'add-report', {
                    config: JSON.stringify(tslib_1.__assign({}, _this.formData, { recipients: _this.formData.recipients.join(','), boardId: _this.board.id, reportId: _this.board.reportId, boardFilterParam: _this.board.layout.rows[0].params.map(function (item) {
                            return new data_type_1.FilterData(item.col[0].column, item.type, item.values, null, _this.paramService.getParamTitle(item));
                        }), exportConfig: _this.dataService.getConfigs(_this.board) }))
                }, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                    var id = data.id || _this.board.reportId;
                    var navigationExtras = {
                        queryParams: {
                            id: id,
                            dateType: _this.formData.statType
                        }
                    };
                    _this.board.reportName = _this.formData.reportName;
                    _this.dataServer.request('reports', null, request_options_1.REQUEST_OPTIONS).subscribe(function (data) {
                        _this.menuService.reportsSubject.next(data);
                        oldClose(true);
                        _this.router.navigate(['/admin/report', id], navigationExtras);
                    });
                });
            }
        };
    };
    GenerateReportComponent.prototype.addEmail = function (input) {
        if (!input.invalid) {
            this.formData.recipients.unshift(input.value);
            this.formData.email = '';
        }
    };
    GenerateReportComponent.prototype.getParamTitle = function (param) {
        return this.paramService.getParamTitle(param);
    };
    GenerateReportComponent = tslib_1.__decorate([
        core_1.Component({
            template: '<form><div class=\"form-row\"><div class=\"form-group col-md-6\"><label for=\"inputName\" class=\"col-form-label\">{{\'REPORT.NAME\' | translate}}</label> <input id=\"inputName\" name=\"name\" type=\"text\" class=\"form-control\" required=\"\" [(ngModel)]=\"formData.reportName\"></div><div class=\"form-group col-md-6\"><label for=\"inputType\" class=\"col-form-label\">{{\'REPORT.TYPE\' | translate}}</label><select id=\"inputType\" name=\"type\" class=\"form-control\" required=\"\" [(ngModel)]=\"formData.statType\" [disabled]=\"!!board.reportId\"><option value=\"2\">{{\'REPORT.OPTIONS.TYPE_DAILY\' | translate}}</option><option value=\"3\">{{\'REPORT.OPTIONS.TYPE_WEEKLY\' | translate}}</option><option value=\"4\">{{\'REPORT.OPTIONS.TYPE_MONTHLY\' | translate}}</option><option value=\"5\">{{\'REPORT.OPTIONS.TYPE_ANNUALLY\' | translate}}</option></select></div></div><div class=\"form-group\"><label class=\"col-form-label\">{{\'COMMON.PARAM\' | translate}}</label><ul class=\"list-unstyled\"><li class=\"d-inline-block badge badge-dark p-2 mr-2 mb-2\" *ngFor=\"let param of this.board.layout.rows[0].params\">{{getParamTitle(param)}}</li></ul></div><div class=\"form-group\"><label for=\"inputEmail\" class=\"col-form-label\">{{\'REPORT.EMAIL\' | translate}}</label><div class=\"input-group\"><input id=\"inputEmail\" name=\"email\" type=\"email\" class=\"form-control\" required=\"\" #email=\"ngModel\" [(ngModel)]=\"formData.email\"><div class=\"input-group-append\"><button class=\"btn btn-outline-secondary\" type=\"button\" (click)=\"addEmail(email)\">{{\'COMMON.ADD\' | translate}}</button></div></div></div><ul class=\"list-unstyled\"><li class=\"d-inline-block badge badge-light p-2 mr-2 mb-2\" *ngFor=\"let email of formData.recipients; let index = index\">{{email}} <a class=\"ml-2\" href=\"javascript:void(0);\" (click)=\"formData.recipients.splice(index, 1)\"><i class=\"fa fa-trash fa-sm\" aria-hidden=\"true\"></i></a></li></ul></form>'
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            core_2.ApiServer,
            menu_service_1.MenuService,
            data_service_1.DataService,
            param_service_1.ParamService])
    ], GenerateReportComponent);
    return GenerateReportComponent;
}());
exports.GenerateReportComponent = GenerateReportComponent;

//# sourceMappingURL=../../sourcemaps/src/board/generate-report.component.js.map
