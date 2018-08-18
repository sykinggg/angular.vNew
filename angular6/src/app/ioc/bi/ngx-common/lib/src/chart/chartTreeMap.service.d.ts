import { ActivatedRoute } from '@angular/router';
export declare class ChartTreeMapService {
    private activatedRoute;
    constructor(activatedRoute: ActivatedRoute);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): (o: any) => void;
    parseOption(data: any): any;
    /**
     * 递归
     */
    recursion(depth: any, totalDepth: any, prefix: any, keys: any, values: any, style?: any): any[];
    getMap(depth: any, totalDepth: any, prefix: any, keys: any, values: any): {};
    createRandomItemStyle(): {
        normal: {
            color: string;
        };
    };
}
