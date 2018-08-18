import { CBoardBMapRenderService } from './render/cBoardBMapRender.service';
export declare class ChartChinaMapBMapService {
    private cBoardBMapRenderService;
    constructor(cBoardBMapRenderService: CBoardBMapRenderService);
    render(containerDom: any, option: any, scope: any, persist: any, drill: any): void;
    parseOption(data: any): {
        bmap: {
            center: number[];
            zoom: number;
            roam: boolean;
            mapStyle: {
                styleJson: ({
                    'featureType': string;
                    'elementType': string;
                    'stylers': {
                        'color': string;
                        'visibility'?: undefined;
                    };
                } | {
                    'featureType': string;
                    'elementType': string;
                    'stylers': {
                        'visibility': string;
                        'color'?: undefined;
                    };
                })[];
            };
        };
        legend: {
            orient: string;
            top: string;
            left: string;
            selectedMode: string;
            data: any[];
        };
        visualMap: {
            min: any;
            max: any;
            left: string;
            top: string;
            inRange: {
                color: string[];
            };
            calculable: boolean;
            textStyle: {
                color: string;
            };
        };
        tooltip: {
            trigger: string;
        };
        series: any[];
    };
}
