"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var threeLevelMap_Service_1 = require("../common/threeLevelMap.Service");
var html2canvas = require('html2canvas');
var _ = require("lodash");
var CBoardMapRenderService = /** @class */ (function () {
    function CBoardMapRenderService(threeLevelMap) {
        this.threeLevelMap = threeLevelMap;
    }
    CBoardMapRenderService.prototype.CBoardMapRender = function (jqContainer, options, drill) {
        this.options = options;
        this.tall;
        this.jqContainer = jqContainer;
        this.drill = drill;
        var _this = this;
        $(jqContainer).html("<div class='map_wrapper'></div>");
        $('.map_wrapper').resize(function () {
            _this.do(_this.tall);
        });
        return this;
    };
    ;
    CBoardMapRenderService.prototype.do = function (tall, persist) {
        this.tall = tall;
        this.container = this.jqContainer;
        tall = _.isUndefined(tall) ? 500 : tall;
        var args = {
            height: tall - 20,
            chartConfig: this.options.chartConfig,
            data: this.options.data,
            container: this.container,
            drill: this.drill
        };
        try {
            this.threeLevelMap.map(args);
        }
        catch (err) {
        }
        $(this.jqContainer).css({
            height: tall + 40 + "px",
            width: '100%'
        });
        $(this.container).css({
            height: tall + "px",
            width: '100%'
        });
        var _this = this;
        if (persist) {
            setTimeout(function () {
                // html2canvas(_this.container[0], {
                //     onrendered: function (canvas) {
                //         persist.data = canvas.toDataURL("image/jpeg");
                //         persist.type = "jpg"
                //     }
                // });
                html2canvas(_this.container[0]).then(function (canvas) {
                    persist.data = canvas.toDataURL("image/jpeg");
                    persist.type = "jpg";
                });
            }, 1000);
        }
        return function (o) {
            _this.options = o;
            _this.do(_this.tall);
        };
    };
    ;
    CBoardMapRenderService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [threeLevelMap_Service_1.ThreeLevelMapService])
    ], CBoardMapRenderService);
    return CBoardMapRenderService;
}());
exports.CBoardMapRenderService = CBoardMapRenderService;

//# sourceMappingURL=../../../sourcemaps/src/chart/render/cBoardMapRender.service.js.map
