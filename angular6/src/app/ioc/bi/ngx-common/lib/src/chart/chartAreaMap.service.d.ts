import { ActivatedRoute } from '@angular/router';
export declare class ChartAreaMapService {
    private activatedRoute;
    constructor(activatedRoute: ActivatedRoute);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): (o: any) => void;
    parseOption(data: any): any;
    processLocName(rawName: any, zoomLevel: any): any;
}
