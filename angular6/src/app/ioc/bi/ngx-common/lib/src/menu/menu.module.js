"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var menu_service_1 = require("./menu.service");
var MenuModule = /** @class */ (function () {
    function MenuModule(parentModule) {
        if (parentModule) {
            throw new Error('MenuModule is already loaded. Import it in the AppModule only');
        }
    }
    MenuModule_1 = MenuModule;
    MenuModule.forRoot = function () {
        return {
            ngModule: MenuModule_1
        };
    };
    var MenuModule_1;
    MenuModule = MenuModule_1 = tslib_1.__decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [],
            exports: [],
            providers: [menu_service_1.MenuService]
        }),
        tslib_1.__param(0, core_1.Optional()), tslib_1.__param(0, core_1.SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [MenuModule])
    ], MenuModule);
    return MenuModule;
}());
exports.MenuModule = MenuModule;

//# sourceMappingURL=../../sourcemaps/src/menu/menu.module.js.map
