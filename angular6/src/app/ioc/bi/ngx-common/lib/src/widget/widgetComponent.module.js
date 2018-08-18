"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tree_component_1 = require("./tree.component");
var http_1 = require("@angular/common/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_2 = require("@ngx-translate/core");
var angular_tree_component_1 = require("angular-tree-component");
var ng2_dnd_1 = require("ng2-dnd");
var tree_config_module_1 = require("app/shared/tree/tree-config.module");
var form_control_service_1 = require("app/shared/input/form-control.service");
var input_module_1 = require("app/shared/input/input.module");
var information_module_1 = require("app/shared/information/information.module");
var WidgetComponentModule = /** @class */ (function () {
    function WidgetComponentModule() {
    }
    WidgetComponentModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                core_2.TranslateModule,
                angular_tree_component_1.TreeModule,
                ng2_dnd_1.DndModule,
                tree_config_module_1.TreeConfigModule,
                input_module_1.InputModule,
                information_module_1.InformationModule
            ],
            providers: [
                form_control_service_1.FormControlService,
            ],
            declarations: [
                tree_component_1.WidgetTreeComponent
            ],
            entryComponents: [],
            exports: [
                tree_component_1.WidgetTreeComponent
            ]
        })
    ], WidgetComponentModule);
    return WidgetComponentModule;
}());
exports.WidgetComponentModule = WidgetComponentModule;

//# sourceMappingURL=../../sourcemaps/src/widget/widgetComponent.module.js.map
