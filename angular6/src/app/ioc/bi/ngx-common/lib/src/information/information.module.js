"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_2 = require("@ngx-translate/core");
var information_component_1 = require("./information.component");
var InformationModule = /** @class */ (function () {
    function InformationModule() {
    }
    InformationModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule
            ],
            declarations: [
                information_component_1.InformationComponent
            ],
            entryComponents: [information_component_1.InformationComponent],
            exports: [information_component_1.InformationComponent],
            providers: []
        })
    ], InformationModule);
    return InformationModule;
}());
exports.InformationModule = InformationModule;

//# sourceMappingURL=../../sourcemaps/src/information/information.module.js.map
