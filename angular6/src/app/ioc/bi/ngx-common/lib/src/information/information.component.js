"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var InformationComponent = /** @class */ (function () {
    function InformationComponent() {
    }
    InformationComponent.prototype.afterDialogInit = function (dialog, modalContent) {
        this.content = dialog.data;
    };
    InformationComponent = tslib_1.__decorate([
        core_1.Component({
            selector: '[sk-bi-information]',
            template: '<dl class=\"row\"><dt class=\"col-sm-4\">Id</dt><dd class=\"col-sm-8\">{{content.id}}</dd><dt class=\"col-sm-4\">{{\"CONFIG.DASHBOARD.NAME\"|translate}}</dt><dd class=\"col-sm-8\">{{content.name}}</dd><dt class=\"col-sm-4\">{{\"COMMON.USER_ID\"|translate}}</dt><dd class=\"col-sm-8\">{{content.userId}}</dd><dt class=\"col-sm-4\">{{\"CONFIG.JOB.USERNAME\"|translate}}</dt><dd class=\"col-sm-8\">{{content.userName}}</dd><dt class=\"col-sm-4\">{{\"COMMON.CREATOR_NAME\"|translate}}</dt><dd class=\"col-sm-8\">{{content.loginName}}</dd><dt class=\"col-sm-4\">{{\"COMMON.CREATE_TIME\"|translate}}</dt><dd class=\"col-sm-8\">{{content.createTime}}</dd><dt class=\"col-sm-4\">{{\"COMMON.UPDATE_TIM\"|translate}}</dt><dd class=\"col-sm-8\">{{content.updateTime}}</dd></dl>'
        })
    ], InformationComponent);
    return InformationComponent;
}());
exports.InformationComponent = InformationComponent;

//# sourceMappingURL=../../sourcemaps/src/information/information.component.js.map
