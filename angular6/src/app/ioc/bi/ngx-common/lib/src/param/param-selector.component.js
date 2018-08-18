"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ParamSelectorComponent = /** @class */ (function () {
    function ParamSelectorComponent() {
        this.types = ['=', '≠', '>', '<', '≥', '≤', '(a,b]', '[a,b)', '(a,b)', '[a,b]'];
        this.Keyword = '';
        this.selects = [];
        this.selectItems = [];
        this.operate = {};
        this.byFilter = {
            a: false
        };
        this.loadSelect = true;
        this.loading = false;
    }
    ParamSelectorComponent.prototype.showValues = function () {
        var owner = this;
        var equal = ['=', '≠'];
        var openInterval = ['>', '<', '≥', '≤'];
        var closeInterval = ['(a,b]', '[a,b)', '(a,b)', '[a,b]'];
        this.operate.equal = equal.some(function (item) {
            return item === owner.param.type;
        });
        this.operate.openInterval = openInterval.some(function (item) {
            return item === owner.param.type;
        });
        this.operate.closeInterval = closeInterval.some(function (item) {
            return item === owner.param.type;
        });
    };
    ParamSelectorComponent.prototype.afterDialogInit = function (dialog, modalContent) {
        this.filter = dialog.data.filter;
        this.param = dialog.data.param;
        if (this.param.values.length === 0) {
            this.param.values.length = 1;
        }
        this.fetchSelects = dialog.data.getSelects;
        this.showValues();
    };
    ParamSelectorComponent.prototype.dbclickPush = function (o) {
        if (this.operate.equal) {
            if (this.param.values.length === 1 && (!this.param.values[0] || this.param.values[0] === '')) {
                this.param.values.length = 0;
            }
            this.param.values.push(o);
        }
        if (this.operate.openInterval) {
            this.param.values[0] = o;
        }
        if (this.operate.closeInterval) {
            if (this.param.values[0] === undefined || this.param.values[0] === '') {
                this.param.values[0] = o;
            }
            else {
                this.param.values[1] = o;
            }
        }
    };
    ParamSelectorComponent.prototype.deleteValues = function (array) {
        if (this.operate.equal) {
            this.param.values = this.param.values.filter(function (item) {
                return array.indexOf(item) < 0;
            });
        }
    };
    ParamSelectorComponent.prototype.pushValues = function () {
        if (this.param.values.length === 1 && (!this.param.values[0] || this.param.values[0] === '')) {
            this.param.values.length = 0;
        }
        if (this.operate.openInterval) {
            this.selectItems.splice(1, this.selectItems.length - 1);
        }
        if (this.operate.closeInterval) {
            this.selectItems.splice(2, this.selectItems.length - 2);
        }
        this.param.values = this.param.values.concat(this.selectItems);
        this.selectItems = [];
    };
    ParamSelectorComponent.prototype.filterType = function () {
        this.param.values = [];
        this.param.values.length = 1;
        this.showValues();
    };
    ParamSelectorComponent.prototype.getSelects = function () {
        var owner = this;
        this.loading = true;
        this.fetchSelects(this.byFilter.a, this.param.col, function (d) {
            owner.selects = d;
            owner.loading = false;
        });
    };
    ParamSelectorComponent.prototype.getFilteredOptions = function () {
        var owner = this;
        return this.selects.filter(function (item) {
            return owner.param.values.indexOf(item) < 0 && item.indexOf(owner.Keyword) > -1;
        });
    };
    ParamSelectorComponent = tslib_1.__decorate([
        core_1.Component({
            template: '<div class=\"form-group\" *ngFor=\"let alert of alerts\"><ngb-alert [type]=\"alert.type || \'warning\'\" (close)=\"closeAlert(alert)\">{{alert.msg}}</ngb-alert></div><div class=\"row\"><div class=\"col-md-5\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text\" id=\"addonKeyword\">{{\'DASHBOARD.PARAM.FIND\'|translate}}</span></div><input name=\"keyword\" type=\"text\" class=\"form-control\" [(ngModel)]=\"keyword\" aria-label=\"Keyword\" aria-describedby=\"addonKeyword\"></div><div class=\"form-group\" *ngIf=\"!loadSelect\"><select multiple=\"\" class=\"form-control\" [(ngModel)]=\"selectItems\" style=\"height: 300px\"><option *ngFor=\"let v of getFilteredOptions()\" style=\"overflow: hidden;white-space: nowrap;text-overflow: ellipsis;\" [ngValue]=\"v\" (dblclick)=\"dbclickPush(v)\">{{v}}</option></select></div><div class=\"jumbotron\" style=\"height: 300px; margin: 0px;\" *ngIf=\"loadSelect\"><h3>{{\'COMMON.WANRING\'|translate}}</h3><p>{{\'DASHBOARD.PARAM.LIST_WARN\'|translate}}</p><button type=\"button\" (click)=\"getSelects(); loadSelect = false;\" class=\"btn btn-warning float-right\">{{\'COMMON.LOAD\'|translate}}</button></div></div><div class=\"col-md-2 text-center\"><div class=\"form-group\"><label class=\"control-label\">&nbsp;</label><select class=\"form-control filterOptions\" [(ngModel)]=\"param.type\" (change)=\"filterType()\"><option *ngFor=\"let type of types\" [ngValue]=\"type\">{{type}}</option></select></div><div *ngIf=\"operate.equal\"><button type=\"button\" class=\"btn btn-default mb-2\" *ngIf=\"operate.equal\" (click)=\"pushValues()\"><i class=\"fa fa-angle-right fa-fw\"></i></button><div></div><button type=\"button\" class=\"btn btn-default mb-2\" (click)=\"deleteValues(selectValues)\"><i class=\"fa fa-angle-left fa-fw\"></i></button><div></div><button type=\"button\" class=\"btn btn-default mb-2\" (click)=\"param.values = []\"><i class=\"fa fa-angle-double-left fa-fw\"></i></button></div></div><div class=\"col-md-5\"><div class=\"form-group\" *ngIf=\"operate.equal\"><label class=\"control-label\">{{\'DASHBOARD.PARAM.VALUE\'|translate}}</label> <button type=\"button\" (click)=\"param.values.length = param.values.length + 1\" class=\"btn btn-primary btn-sm m-1\">+</button><div *ngFor=\"let value of param.values; let index = index;\"><div class=\"input-group mb-2\"><input name=\"value\" type=\"text\" class=\"form-control\" [(ngModel)]=\"param.values[index]\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default dropdown-toggle-split\" ngbDropdownToggle=\"\"></button><ul ngbDropdownMenu=\"\"><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'M\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1M\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'W\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1W\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'D\\', -10, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST10D\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'D\\', -10, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST10D_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'h\\', -3, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST3H_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{now(\\'m\\', -60, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST60MIN_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{loginName}\'\"><a>{{\'COMMON.LOGIN_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{userName}\'\"><a>{{\'COMMON.USER_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[index]=\'{userRoles}\'\"><a>{{\'COMMON.USER_ROLES\'|translate}}</a></li></ul><button type=\"button\" class=\"btn btn-default dropdown-toggle-split\" (click)=\"param.values.splice(index, 1)\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> <span class=\"sr-only\">{{\'COMMON.REMOVE\'|translate}}</span></button></div></div></div></div><div *ngIf=\"operate.openInterval\"><label class=\"control-label\">{{\'DASHBOARD.PARAM.VALUE\'|translate}}</label><div class=\"input-group\"><input name=\"value\" type=\"text\" class=\"form-control\" [(ngModel)]=\"param.values[0]\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default dropdown-toggle-split\" ngbDropdownToggle=\"\"></button><ul ngbDropdownMenu=\"\"><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'M\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1M\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'W\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1W\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'D\\', -10, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST10D\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'D\\', -10, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST10D_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'h\\', -3, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST3H_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'m\\', -60, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST60MIN_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{loginName}\'\"><a>{{\'COMMON.LOGIN_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{userName}\'\"><a>{{\'COMMON.USER_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{userRoles}\'\"><a>{{\'COMMON.USER_ROLES\'|translate}}</a></li></ul></div></div></div><div *ngIf=\"operate.closeInterval\"><label class=\"control-label\">{{\'DASHBOARD.PARAM.VALUE_A\'|translate}}</label><div class=\"input-group\"><input name=\"value\" type=\"text\" class=\"form-control\" [(ngModel)]=\"param.values[0]\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default dropdown-toggle-split\" ngbDropdownToggle=\"\"></button><ul ngbDropdownMenu=\"\"><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'M\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1M\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'W\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1W\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'D\\', -10, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST10D\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'D\\', -10, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST10D_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'h\\', -3, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST3H_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{now(\\'m\\', -60, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST60MIN_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{loginName}\'\"><a>{{\'COMMON.LOGIN_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{userName}\'\"><a>{{\'COMMON.USER_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[0]=\'{userRoles}\'\"><a>{{\'COMMON.USER_ROLES\'|translate}}</a></li></ul></div></div><label class=\"control-label\">{{\'DASHBOARD.PARAM.VALUE_B\'|translate}}</label><div class=\"input-group\"><input name=\"value\" type=\"text\" class=\"form-control\" [(ngModel)]=\"param.values[1]\"><div class=\"input-group-append\" ngbDropdown=\"\"><button type=\"button\" class=\"btn btn-default dropdown-toggle-split\" ngbDropdownToggle=\"\"></button><ul ngbDropdownMenu=\"\"><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'M\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1M\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'W\\', -1, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST1W\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'D\\', -10, \\'yyyy-MM-dd\\')}\'\"><a>{{\'COMMON.LAST10D\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'D\\', -10, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST10D_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'h\\', -3, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST3H_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{now(\\'m\\', -60, \\'timestamp\\')}\'\"><a>{{\'COMMON.LAST60MIN_TIMESTAMP\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{loginName}\'\"><a>{{\'COMMON.LOGIN_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{userName}\'\"><a>{{\'COMMON.USER_NAME\'|translate}}</a></li><li class=\"dropdown-item\" (click)=\"param.values[1]=\'{userRoles}\'\"><a>{{\'COMMON.USER_ROLES\'|translate}}</a></li></ul></div></div></div></div></div><div class=\"row\" *ngIf=\"filter\"><div class=\"col-md-5\"><div class=\"custom-control custom-checkbox\"><input id=\"inputFilter\" name=\"filter\" type=\"checkbox\" class=\"custom-control-input\" [(ngModel)]=\"byFilter.a\" (change)=\"getSelects()\"> <label class=\"custom-control-label\" for=\"inputFilter\">{{\'CONFIG.WIDGET.SHOW_BY_FILTER\'|translate}}</label></div></div></div><div class=\"overlay\" *ngIf=\"loading\"><i class=\"fa fa-sync-alt fa-spin\"></i></div>'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ParamSelectorComponent);
    return ParamSelectorComponent;
}());
exports.ParamSelectorComponent = ParamSelectorComponent;

//# sourceMappingURL=../../sourcemaps/src/param/param-selector.component.js.map
