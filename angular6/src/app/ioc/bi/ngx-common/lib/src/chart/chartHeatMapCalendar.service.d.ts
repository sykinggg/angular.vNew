import { TranslateService } from '@ngx-translate/core';
export declare class ChartHeatMapCalendarService {
    private translateService;
    constructor(translateService: TranslateService);
    render(containerDom: any, option: any, scope: any, persist: any): (o: any) => void;
    parseOption(data: any): {
        tooltip: {
            position: string;
            trigger: string;
            axisPointer: {
                show: boolean;
                type: string;
            };
            formatter: (params: any) => string;
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
        visualMap: {
            min: number;
            max: number;
            calculable: boolean;
            orient: string;
            left: string;
            bottom: string;
            inRange: {
                color: any[];
            };
        };
        calendar: {
            top: number;
            cellSize: (string | number)[];
            range: any;
            itemStyle: {
                normal: {
                    borderWidth: number;
                };
            };
            monthLabel: {
                nameMap: string;
            };
            dayLabel: {
                firstDay: number;
                nameMap: string;
            };
            yearLabel: {
                show: boolean;
            };
        }[];
        series: {
            type: string;
            coordinateSystem: string;
            calendarIndex: number;
            data: any;
        }[];
    };
}
