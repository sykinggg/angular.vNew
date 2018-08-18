"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_2 = require("@ngx-translate/core");
var form_control_service_1 = require("./form-control.service");
var input_component_1 = require("./input.component");
var InputModule = /** @class */ (function () {
    function InputModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    InputModule_1 = InputModule;
    InputModule.forRoot = function () {
        return {
            ngModule: InputModule_1
        };
    };
    var InputModule_1;
    InputModule = InputModule_1 = tslib_1.__decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, core_2.TranslateModule],
            declarations: [input_component_1.InputComponent],
            exports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, input_component_1.InputComponent],
            providers: [form_control_service_1.FormControlService]
        }),
        tslib_1.__param(0, core_1.Optional()), tslib_1.__param(0, core_1.SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [InputModule])
    ], InputModule);
    return InputModule;
}());
exports.InputModule = InputModule;

//# sourceMappingURL=../../sourcemaps/src/input/input.module.js.map
