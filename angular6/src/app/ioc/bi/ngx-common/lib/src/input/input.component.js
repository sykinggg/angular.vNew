"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var input_1 = require("./input");
var InputComponent = /** @class */ (function () {
    function InputComponent() {
    }
    Object.defineProperty(InputComponent.prototype, "isValid", {
        get: function () {
            return this.form.controls[this.input.name].valid;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", input_1.Input)
    ], InputComponent.prototype, "input", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", forms_1.FormGroup)
    ], InputComponent.prototype, "form", void 0);
    InputComponent = tslib_1.__decorate([
        core_1.Component({
            selector: '[sk-bi-input]',
            template: '<div [ngSwitch]=\"input.type\" [formGroup]=\"form\"><div *ngSwitchCase=\"\'select\'\"><label [attr.for]=\"input.name\">{{input.label | translate}}</label><select *ngSwitchCase=\"\'select\'\" [id]=\"input.name\" [formControlName]=\"input.name\" class=\"form-control\"><option *ngFor=\"let opt of input.options; let key = $index\" [value]=\"key\">{{opt}}</option></select></div><div *ngSwitchCase=\"\'checkbox\'\" class=\"custom-control custom-checkbox\"><input type=\"checkbox\" class=\"custom-control-input\" [id]=\"input.name\" [formControlName]=\"input.name\"> <label class=\"custom-control-label\" [attr.for]=\"input.name\">{{input.label | translate}}</label></div><div *ngSwitchCase=\"\'radio\'\" class=\"custom-control custom-radio\"><input type=\"radio\" class=\"custom-control-input\" [id]=\"input.name\" [formControlName]=\"input.name\"> <label class=\"custom-control-label\" [attr.for]=\"input.name\">{{input.label | translate}}</label></div><div *ngSwitchCase=\"\'textarea\'\"><label [attr.for]=\"input.name\">{{input.label | translate}}</label> <textarea [id]=\"input.name\" [formControlName]=\"input.name\" [placeholder]=\"input.placeholder\" class=\"form-control\" row=\"6\">
        </textarea></div><div *ngSwitchDefault=\"\"><label [attr.for]=\"input.name\">{{input.label | translate}}</label> <input [id]=\"input.name\" [formControlName]=\"input.name\" [type]=\"input.type\" [placeholder]=\"input.placeholder\" class=\"form-control\"></div></div>'
        })
    ], InputComponent);
    return InputComponent;
}());
exports.InputComponent = InputComponent;

//# sourceMappingURL=../../sourcemaps/src/input/input.component.js.map
