

import { CBoardTableRenderService } from './render/tableRender.service';
import { ChartDataProcessService } from './common/chartDataProcess.service';
// import {CBoardTableRender} from './render/tableRender';
// import {chartDataProcess} from './common/chartDataProcess';
// var chartDataProcessFun = chartDataProcess


export class ChartTableService {
    constructor(
        private cBoardTableRender: CBoardTableRenderService,
        private chartDataProcess: ChartDataProcessService
    ) {}

    public render(containerDom, option, persist, drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        // scope ? height = scope.myheight - 20 : null;
        return this.cBoardTableRender.CBoardTableRender(containerDom, option, drill).do(height, persist);
    };

    public parseOption(data) {
        var tableOption = this.chartDataProcess.chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        return tableOption;
    };
}