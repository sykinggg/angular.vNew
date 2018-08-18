"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var html2canvas = require('html2canvas');
var CBoardKpiRenderService = /** @class */ (function () {
    function CBoardKpiRenderService() {
        this.template = "<div class=\"jumbotron pt-2 px-2 pb-0 mb-0 rounded-0 {style}\" style=\"position: relative; overflow: hidden;\">\n    <h3 class=\"p-2 h1\"><strong>{kpiValue}</strong></h3>\n    <p class=\"p-2 mb-4\">{kpiName}</p>\n    <i class=\"fa fa-signal fa-3x text-muted position-absolute\" aria-hidden=\"true\" style=\"top: 50%; right: 0.5rem; margin-top: -0.75em; opacity: 0.4;\"></i>\n    </div>";
    }
    CBoardKpiRenderService.prototype.CBoardKpiRender = function (jqContainer, options) {
        this.container = jqContainer; // jquery object
        this.options = options;
        return this;
    };
    ;
    CBoardKpiRenderService.prototype.html = function (persist) {
        var self = this;
        var temp = "" + self.template;
        var html = temp.render(self.options);
        if (persist) {
            setTimeout(function () {
                self.container.css('background', '#fff');
                // html2canvas api改变
                // self.html2canvas(self.container);
                // console.log('CBoardKpiRender');
                // console.log(self.container);
                // html2canvas(self.container).then((res: any) => {
                //     console.log(res);
                // })
            }, 1000);
            persist.data = { name: self.options.kpiName, value: self.options.kpiValue };
            persist.type = "kpi";
        }
        return html;
    };
    ;
    CBoardKpiRenderService.prototype.realTimeTicket = function () {
        var self = this;
        return function (o) {
            $(self.container).find('h3').html(o.kpiValue);
        };
    };
    ;
    CBoardKpiRenderService.prototype.do = function () {
        var self = this;
        $(self.container).html(self.rendered());
    };
    ;
    CBoardKpiRenderService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], CBoardKpiRenderService);
    return CBoardKpiRenderService;
}());
exports.CBoardKpiRenderService = CBoardKpiRenderService;

//# sourceMappingURL=../../../sourcemaps/src/chart/render/kpiRender.service.js.map
