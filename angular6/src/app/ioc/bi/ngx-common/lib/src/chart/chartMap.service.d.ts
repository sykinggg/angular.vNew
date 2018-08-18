import { CBoardMapRenderService } from './render/cBoardMapRender.service';
import { ChartDataProcessService } from './common/chartDataProcess.service';
export declare class ChartMapService {
    private cBoardMapRender;
    private chartDataProcess;
    constructor(cBoardMapRender: CBoardMapRenderService, chartDataProcess: ChartDataProcessService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any): (o: any) => void;
    parseOption(data: any): {
        chartConfig: any;
        data: any;
    };
}
