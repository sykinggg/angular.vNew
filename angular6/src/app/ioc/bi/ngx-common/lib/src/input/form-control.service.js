"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormControlService = /** @class */ (function () {
    function FormControlService() {
    }
    FormControlService.prototype.toFormGroup = function (inputs, params) {
        var group = {};
        var labelPattern = new RegExp('.*\'([\\w\\.]+)\'.*');
        inputs.forEach(function (item) {
            if (item.type === 'checkbox' && item.checked === true) {
                params[item.name] = true;
            }
            if (item.type === 'number' && item.value !== '' && !isNaN(item.value)) {
                params[item.name] = Number(item.value);
            }
            else if (item.value !== '') {
                params[item.name] = item.value;
            }
            else {
                item.value = params[item.name];
            }
            item.label = item.label.replace(labelPattern, '$1');
            group[item.name] = item.required ? new forms_1.FormControl(item.value || '', forms_1.Validators.required) : new forms_1.FormControl(item.value || '');
        });
        return new forms_1.FormGroup(group);
    };
    FormControlService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControlService);
    return FormControlService;
}());
exports.FormControlService = FormControlService;

//# sourceMappingURL=../../sourcemaps/src/input/form-control.service.js.map
