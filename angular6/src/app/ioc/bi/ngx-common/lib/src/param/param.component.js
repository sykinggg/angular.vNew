"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var core_3 = require("core-services/core");
var ParamComponent = /** @class */ (function () {
    function ParamComponent(translateService, dialogService) {
        this.translateService = translateService;
        this.dialogService = dialogService;
    }
    ParamComponent.prototype.ngOnInit = function () {
        this.paramTypes = [{
                name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_PICKER'),
                value: 'picker'
            }, {
                name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_SLIDER'),
                value: 'slider'
            }, {
                name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_DATE_RANGE'),
                value: 'date_range'
            }, {
                name: this.translateService.instant('CONFIG.DASHBOARD.PARAM_TYPE_SELECTOR'),
                value: 'selector'
            }];
    };
    ParamComponent.prototype.afterDialogInit = function (dialog, modalContent) {
        var _this = this;
        var owner = this;
        var oldClose = dialog.modal.close;
        dialog.modal.close = function () {
            if (_this.param.name) {
                oldClose(true);
            }
            else {
                owner.dialogService.alert(_this.translateService.instant('CONFIG.DASHBOARD.ENTER_PARAMETER_NAME'), 'COMMON.TIP', 0);
            }
        };
        this.param = dialog.data.param;
        this.status = dialog.data.status;
        this.boardDataset = dialog.data.boardDataset;
        if (!this.param.paramType) {
            this.param.paramType = 'picker';
        }
        if (!this.param.cfg) {
            this.param.cfg = {};
        }
    };
    ParamComponent.prototype.closeAlert = function (alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    };
    ParamComponent.prototype.add = function (selectedDataset, column) {
        var v = tslib_1.__assign({}, selectedDataset);
        var paramCol = this.param.col;
        var haveCol = null;
        delete v.columns;
        v.column = column;
        for (var i = 0; i < paramCol.length; i++) {
            (paramCol[i].column === v.column && paramCol[i].name === v.name) ? haveCol = true : null;
        }
        (!haveCol || this.param.col === []) ? this.param.col.push(v) : null;
    };
    ParamComponent.prototype.deleteColumn = function (index) {
        this.param.col.splice(index, 1);
    };
    ParamComponent.prototype.isSelected = function (column, dataset) {
        return this.param.col.some(function (item) {
            return item.name === dataset && item.column === column;
        });
    };
    ParamComponent = tslib_1.__decorate([
        core_1.Component({
            template: '<div class=\"form-group\" *ngFor=\"let alert of alerts\"><ngb-alert [type]=\"alert.type || \'warning\'\" (close)=\"closeAlert(alert)\">{{alert.msg}}</ngb-alert></div><div class=\"form-group\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">{{\'CONFIG.DASHBOARD.PARAM_NAME\'|translate}}</span></div><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.name\"></div></div><div class=\"row mb-3\"><div class=\"col-md-5\"><div class=\"border\"><h4 class=\"h6 p-2 bg-light\"><i class=\"fa fa-cube\" aria-hidden=\"true\"></i> <span>{{\'CONFIG.DASHBOARD.CUBE_TREE\'|translate}}</span></h4><div class=\"container-fluid\"><ul class=\"list-unstyled\"><li *ngFor=\"let dataset of boardDataset\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"dataset.isCollapsed = !dataset.isCollapsed;\"><i class=\"fa\" aria-hidden=\"false\" [ngClass]=\"{\'fa-caret-down\': dataset.isCollapsed, \'fa-caret-right\': !dataset.isCollapsed}\"></i> {{dataset.name}}</a><ul class=\"list-unstyled pl-4\" [ngbCollapse]=\"!dataset.isCollapsed\"><li *ngFor=\"let column of dataset.columns\"><a href=\"javascript:void(0);\" role=\"button\" [ngClass]=\"{\'text-muted\': isSelected(column, dataset.name)}\" (click)=\"add(dataset, column)\">{{column}}</a></li></ul></li></ul></div></div></div><div class=\"col-md-2\"></div><div class=\"col-md-5\"><div class=\"border\"><h4 class=\"h6 p-2 bg-light\">{{\'CONFIG.DASHBOARD.LINKED_COLUMN\'|translate}}</h4><div class=\"container-fluid\"><ul class=\"list-unstyled\"><li *ngFor=\"let col of param.col; let index = index\" (click)=\"deleteColumn(index)\">{{\'[\' + col.name + \'].[\' + col.column + \']\'}}</li></ul></div></div></div></div><div class=\"form-inline\"><label for=\"inputParamType\" class=\"mr-2\">{{\'CONFIG.DASHBOARD.PARAM_TYPE\'|translate}}</label><select id=\"inputParamType\" class=\"form-control\" [(ngModel)]=\"param.paramType\"><option *ngFor=\"let d of paramTypes\" [ngValue]=\"d.value\">{{d.name}}</option></select></div><div *ngIf=\"param.paramType === \'slider\'\"><div class=\"row\"><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.WIDTH\'|translate}}</label> <input type=\"text\" [(ngModel)]=\"param.cfg.width\" class=\"form-control\" placeholder=\"1-12\"></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.VIEW_FORMMAT\'|translate}}</label><div class=\"input-group\"><input type=\"text\" [(ngModel)]=\"param.cfg.formatter\" class=\"form-control\"><div class=\"input-group-append\" ngbDropdown=\"\"><button id=\"dropdownViewFormat\" type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" aria-labelledby=\"dropdownViewFormat\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.formatter=\'YYYY-MM-DD HH:mm:ss\'\">YYYY-MM-DD HH:mm:ss</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.formatter=\'YYYY-MM-DD\'\">YYYY-MM-DD</a></li></ul></div></div></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.MIN\'|translate}}</label><div class=\"input-group\"><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.cfg.min\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.min=\'now(-1,\\'h\\')\'\">{{\'CONFIG.DASHBOARD.ONE_HOUR_AGO\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.min=\'now(-1,\\'d\\')\'\">{{\'CONFIG.DASHBOARD.ONE_DAY_AGO\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.min=\'now(-1,\\'M\\')\'\">{{\'CONFIG.DASHBOARD.ONE_MONTH_AGO\'|translate}}</a></li></ul></div></div></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.MAX\'|translate}}</label><div class=\"input-group\"><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.cfg.max\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.max=\'now()\'\">{{\'CONFIG.DASHBOARD.NOW\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.max=\'now(-1,\\'h\\')\'\">{{\'CONFIG.DASHBOARD.ONE_HOUR_AGO\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.max=\'now(-1,\\'d\\')\'\">{{\'CONFIG.DASHBOARD.ONE_DAY_AGO\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.max=\'now(-1,\\'M\\')\'\">{{\'CONFIG.DASHBOARD.ONE_MONTH_AGO\'|translate}}</a></li></ul></div></div></div></div></div><div class=\"row\"><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.VALUE_FORMMAT\'|translate}}</label><div class=\"input-group\"><input type=\"text\" [(ngModel)]=\"param.cfg.value_fmt\" class=\"form-control\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.value_fmt=\'YYYY-MM-DD\'\">{{\'CONFIG.DASHBOARD.VALUE_FORMMAT_ALERT\'|translate}} \'YYYY-MM-DD\'</a></li></ul></div></div></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.STEP\'|translate}}</label><div class=\"input-group\"><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.cfg.step\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.step=\'interval(1,\\'s\\')\'\">{{\'CONFIG.DASHBOARD.ONE_SECOND\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.step=\'interval(1,\\'m\\')\'\">{{\'CONFIG.DASHBOARD.ONE_MINUT\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.step=\'interval(1,\\'h\\')\'\">{{\'CONFIG.DASHBOARD.ONE_HOUR\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.step=\'interval(1,\\'d\\')\'\">{{\'CONFIG.DASHBOARD.ONE_DAY\'|translate}}</a></li></ul></div></div></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.MAX_RANGE\'|translate}}</label><div class=\"input-group\"><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.cfg.maxRange\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.maxRange=\'interval(1,\\'s\\')\'\">{{\'CONFIG.DASHBOARD.ONE_SECOND\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.maxRange=\'interval(1,\\'m\\')\'\">{{\'CONFIG.DASHBOARD.ONE_MINUT\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.maxRange=\'interval(1,\\'h\\')\'\">{{\'CONFIG.DASHBOARD.ONE_HOUR\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.maxRange=\'interval(1,\\'d\\')\'\">{{\'CONFIG.DASHBOARD.ONE_DAY\'|translate}}</a></li></ul></div></div></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"\">{{\'CONFIG.DASHBOARD.DEFAUT_RANGE\'|translate}}</label><div class=\"input-group\"><input type=\"text\" class=\"form-control\" [(ngModel)]=\"param.cfg.range\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default\" ngbDropdownToggle=\"\"></button><ul class=\"dropdown-menu\" ngbDropdownMenu=\"\"><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.range=\'interval(1,\\'s\\')\'\">{{\'CONFIG.DASHBOARD.ONE_SECOND\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.range=\'interval(1,\\'m\\')\'\">{{\'CONFIG.DASHBOARD.ONE_MINUT\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.range=\'interval(1,\\'h\\')\'\">{{\'CONFIG.DASHBOARD.ONE_HOUR\'|translate}}</a></li><li class=\"dropdown-item\"><a href=\"javascript:void(0);\" role=\"button\" (click)=\"param.cfg.range=\'interval(1,\\'d\\')\'\">{{\'CONFIG.DASHBOARD.ONE_DAY\'|translate}}</a></li></ul></div></div></div></div></div></div><div class=\"text-center\" *ngIf=\"status.i !== 0\"><i class=\"fa fa-spinner fa-spin\" aria-label=\"Loading\"></i></div>'
        }),
        tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
            core_3.DialogService])
    ], ParamComponent);
    return ParamComponent;
}());
exports.ParamComponent = ParamComponent;

//# sourceMappingURL=../../sourcemaps/src/param/param.component.js.map
