import { ActivatedRoute } from '@angular/router';
export declare class ChartWordCloudService {
    private activatedRoute;
    constructor(activatedRoute: ActivatedRoute);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any, relations: any, chartConfig: any): (o: any) => void;
    parseOption(data: any): {
        tooltip: {
            formatter: string;
        };
        toolbox: {
            show: boolean;
            feature: {
                mark: {
                    show: boolean;
                };
                dataView: {
                    show: boolean;
                    readOnly: boolean;
                };
                restore: {
                    show: boolean;
                };
                saveAsImage: {
                    show: boolean;
                };
            };
        };
        series: {
            type: string;
            gridSize: number;
            sizeRange: number[];
            rotationRange: number[];
            rotationStep: number;
            shape: string;
            textStyle: {
                normal: {
                    color: () => string;
                };
                emphasis: {
                    shadowBlur: number;
                    shadowColor: string;
                };
            };
            data: any[];
        }[];
    };
}
