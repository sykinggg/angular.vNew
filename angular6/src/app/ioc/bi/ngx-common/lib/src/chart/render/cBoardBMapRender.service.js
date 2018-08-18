"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var $ = require("jquery");
var chart_options_1 = require("../chart-options");
var CBoardBMapRenderService = /** @class */ (function () {
    function CBoardBMapRenderService() {
        this.theme = "theme-fin1";
    }
    CBoardBMapRenderService.prototype.CBoardBMapRender = function (jqContainer, options, isDeepSpec, echarts) {
        this.container = jqContainer; // jquery object
        var bMap = jqContainer.get(0);
        $(bMap).css("width", "100%");
        $(bMap).css("height", $(bMap).parent().height + "px");
        this.ecc = echarts.init(jqContainer.get(0), this.theme);
        this.isDeppSpec = isDeepSpec;
        this.options = options;
        return this;
    };
    ;
    CBoardBMapRenderService.prototype.chart = function (group, persist) {
        var self = this;
        var options = this.isDeppSpec == true ? self.options : $.extend(true, {}, chart_options_1.CHART_BASIC_OPTION, self.options);
        if (options.visualMap != undefined) {
            $(this.container).css({
                height: 500 + "px",
                width: '100%'
            });
        }
        if (options.legend.data && options.legend.data.length > 35) {
            options.grid.top = '5%';
            options.legend.show = false;
        }
        if (persist) {
            options.animation = false;
        }
        self.ecc.setOption(options);
        self.changeSize(self.ecc);
        self.container.resize(function (e) {
            self.ecc.resize();
            self.changeSize(self.ecc);
        }); // 图表大小自适应
        if (group) {
            self.ecc.group = group;
            echarts.connect(group);
        }
        if (persist) {
            setTimeout(function () {
                persist.data = self.ecc.getDataURL({
                    type: 'jpeg',
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                });
                persist.type = "jpg";
                persist.widgetType = "echarts";
            }, 1000);
        }
    };
    ;
    CBoardBMapRenderService.prototype.changeSize = function (instance) {
        var o = instance.getOption();
        var seriesType = o.series[0] ? o.series[0].type : null;
        if (seriesType == 'pie') {
            var l = o.series.length;
            var b = instance.getWidth() / (l + 1 + l * 8);
            for (var i = 0; i < l; i++) {
                if ((b * 8) < (instance.getHeight() * 0.75)) {
                    o.series[i].radius = [0, b * 4];
                }
                else {
                    o.series[i].radius = [0, '75%'];
                }
            }
            instance.setOption(o);
        }
    };
    ;
    CBoardBMapRenderService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], CBoardBMapRenderService);
    return CBoardBMapRenderService;
}());
exports.CBoardBMapRenderService = CBoardBMapRenderService;

//# sourceMappingURL=../../../sourcemaps/src/chart/render/cBoardBMapRender.service.js.map
