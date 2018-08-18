"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_2 = require("@ngx-translate/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var param_selector_component_1 = require("./param-selector.component");
var ParamSelectorModule = /** @class */ (function () {
    function ParamSelectorModule() {
    }
    ParamSelectorModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                core_2.TranslateModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                param_selector_component_1.ParamSelectorComponent
            ],
            entryComponents: [param_selector_component_1.ParamSelectorComponent],
            exports: [param_selector_component_1.ParamSelectorComponent],
            providers: []
        })
    ], ParamSelectorModule);
    return ParamSelectorModule;
}());
exports.ParamSelectorModule = ParamSelectorModule;

//# sourceMappingURL=../../sourcemaps/src/param/param-selector.module.js.map
