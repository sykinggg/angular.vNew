
import * as _ from 'lodash';
import { Router } from '@angular/router';
var numbro = require("numbro");
import { TranslateService } from '@ngx-translate/core';

import { CBoardKpiRenderService } from './render/kpiRender.service';
// import { CBoardKpiRender } from './render/kpiRender';
var html2canvas = require('html2canvas');



export class ChartKpiService{
    constructor(
        private translate: TranslateService,
        private cBoardKpiRender: CBoardKpiRenderService
    ) {}

    public render(containerDom, option, scope, persist) {
        var render: any = this.cBoardKpiRender.CBoardKpiRender(containerDom, option);
        var html = render.html(persist);
        if (scope) {
            containerDom.append($compile(html)(scope));
        } else {
            containerDom.html(html);
        }
        return render.realTimeTicket();
    };

    public parseOption(data) {
        var option: any = {};
        var config = data.chartConfig;
        var casted_keys = data.keys;
        var casted_values = data.series;
        var aggregate_data = data.data;
        var newValuesConfig = data.seriesConfig;

        option.kpiValue = aggregate_data.length > 0 ? aggregate_data[0][0] : 'N/A';
        if (config.values[0].format) {
            option.kpiValue = numbro(option.kpiValue).format(config.values[0].format);
        }
        option.kpiName = config.values[0].name;
        option.style = config.values[0].style;
        option.edit = this.translate.instant("COMMON.EDIT");
        option.refresh = this.translate.instant("COMMON.REFRESH");
        return option;
    };
}