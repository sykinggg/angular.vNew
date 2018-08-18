import { CBoardHeatMapRenderService } from './render/cBoardHeatMapRender.service';
export declare class ChartChinaMapService {
    private cBoardHeatMapRenderService;
    constructor(cBoardHeatMapRenderService: CBoardHeatMapRenderService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any): any;
    parseOption(data: any): any;
}
