"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MenuService = /** @class */ (function () {
    function MenuService() {
        this.menuList = [];
        this.categoriesSubject = new BehaviorSubject_1.BehaviorSubject([]);
        this.boardsSubject = new BehaviorSubject_1.BehaviorSubject([]);
        this.reportsSubject = new BehaviorSubject_1.BehaviorSubject([]);
    }
    MenuService.prototype.isShowMenu = function (code) {
        return this.menuList.some(function (menu) {
            return menu.menuCode === code;
        });
    };
    MenuService.prototype.getMenu = function () {
        return this.menuList;
    };
    MenuService.prototype.setMenu = function (menu) {
        this.menuList = menu;
    };
    MenuService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;

//# sourceMappingURL=../../sourcemaps/src/menu/menu.service.js.map
