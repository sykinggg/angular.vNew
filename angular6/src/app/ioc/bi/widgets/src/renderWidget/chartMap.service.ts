import { Injectable } from '@angular/core';
import { CBoardMapRenderService } from './render/cBoardMapRender.service';
import { ChartDataProcessService } from './common/chartDataProcess.service';
@Injectable()

export class ChartMapService {
    constructor(
        private cBoardMapRender: CBoardMapRenderService,
        private chartDataProcess: ChartDataProcessService
    ) {}

    public render(containerDom, option, scope, persist, drill) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return;
        }
        var height;
        scope ? height = scope.myheight : null;
        return this.cBoardMapRender.CBoardMapRender(containerDom, option, drill).do(height, persist);
    };

    public parseOption(data) {
        var mapOption = this.chartDataProcess.chartDataProcess(data.chartConfig, data.keys, data.series, data.data, data.seriesConfig);
        return mapOption;
    };
}