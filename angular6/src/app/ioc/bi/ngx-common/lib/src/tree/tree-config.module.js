"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var tree_config_service_1 = require("./tree-config.service");
var tree_config_1 = require("./tree-config");
var TreeConfigModule = /** @class */ (function () {
    function TreeConfigModule(parentModule) {
        if (parentModule) {
            throw new Error('TreeConfigModule is already loaded. Import it in the AppModule only');
        }
    }
    TreeConfigModule_1 = TreeConfigModule;
    TreeConfigModule.forRoot = function (config) {
        return {
            ngModule: TreeConfigModule_1,
            providers: [{
                    provide: tree_config_1.TreeConfig,
                    useValue: config
                }]
        };
    };
    var TreeConfigModule_1;
    TreeConfigModule = TreeConfigModule_1 = tslib_1.__decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [],
            exports: [],
            providers: [tree_config_service_1.TreeConfigService]
        }),
        tslib_1.__param(0, core_1.Optional()), tslib_1.__param(0, core_1.SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [TreeConfigModule])
    ], TreeConfigModule);
    return TreeConfigModule;
}());
exports.TreeConfigModule = TreeConfigModule;

//# sourceMappingURL=../../sourcemaps/src/tree/tree-config.module.js.map
