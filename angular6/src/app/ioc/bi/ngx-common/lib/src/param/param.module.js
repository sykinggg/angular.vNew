"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_2 = require("@ngx-translate/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var param_component_1 = require("./param.component");
var ParamModule = /** @class */ (function () {
    function ParamModule() {
    }
    ParamModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                core_2.TranslateModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                param_component_1.ParamComponent
            ],
            entryComponents: [param_component_1.ParamComponent],
            exports: [param_component_1.ParamComponent],
            providers: []
        })
    ], ParamModule);
    return ParamModule;
}());
exports.ParamModule = ParamModule;

//# sourceMappingURL=../../sourcemaps/src/param/param.module.js.map
