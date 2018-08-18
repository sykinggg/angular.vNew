"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var data_service_1 = require("./data.service");
var update_service_1 = require("./update.service");
var DataModule = /** @class */ (function () {
    function DataModule(parentModule) {
        if (parentModule) {
            throw new Error('DataModule is already loaded. Import it in the AppModule only');
        }
    }
    DataModule_1 = DataModule;
    DataModule.forRoot = function () {
        return {
            ngModule: DataModule_1
        };
    };
    var DataModule_1;
    DataModule = DataModule_1 = tslib_1.__decorate([
        core_1.NgModule({
            imports: [],
            declarations: [],
            exports: [],
            providers: [data_service_1.DataService, update_service_1.UpdateService]
        }),
        tslib_1.__param(0, core_1.Optional()), tslib_1.__param(0, core_1.SkipSelf()),
        tslib_1.__metadata("design:paramtypes", [DataModule])
    ], DataModule);
    return DataModule;
}());
exports.DataModule = DataModule;

//# sourceMappingURL=../../sourcemaps/src/data/data.module.js.map
