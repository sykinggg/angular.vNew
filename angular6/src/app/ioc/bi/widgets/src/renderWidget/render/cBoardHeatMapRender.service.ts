import * as $ from 'jquery';
import { CHART_BASIC_OPTION } from '../chart-options';

export class CBoardHeatMapRenderService {
    constructor() {}

    isDeppSpec;
    public cBoardHeatMapRender = function (jqContainer, options, isDeepSpec, echarts) {
        this.container = jqContainer; // jquery object
        var heatMap = jqContainer.get(0);
        $(heatMap).css("width", "100%");
        $(heatMap).css("height", "500px");
        this.ecc = echarts.init(jqContainer.get(0), this.theme);
        this.isDeppSpec = isDeepSpec;
        this.options = options;

        return this;
    };

    public theme = "theme-fin1";

    options;
    jqContainer;
    ecc;
    container;
    public chart(group, persist) {
        var self = this;
        var options = this.isDeppSpec == true ? self.options : $.extend(true, {}, CHART_BASIC_OPTION, self.options);
        if (options.visualMap != undefined) {
            $(this.jqContainer).css({
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
        return function (o) {
            o = $.extend(true, {}, CHART_BASIC_OPTION, o)
            self.ecc.setOption(o, true);
        }
    };

    public changeSize(instance) {
        var o = instance.getOption();
        var seriesType = o.series[0] ? o.series[0].type : null;
        if (seriesType == 'pie') {
            var l = o.series.length;
            var b = instance.getWidth() / (l + 1 + l * 8)
            for (var i = 0; i < l; i++) {
                if ((b * 8) < (instance.getHeight() * 0.75)) {
                    o.series[i].radius = [0, b * 4];
                } else {
                    o.series[i].radius = [0, '75%'];
                }
            }
            instance.setOption(o);
        }
    
    };
}