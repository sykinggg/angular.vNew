export declare class ChartGaugeService {
    constructor();
    render(containerDom: any, option: any, scope: any, persist: any): (o: any) => void;
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
            min: number;
            max: number;
            splitNumber: number;
            axisLine: {
                lineStyle: {
                    color: (string | number)[][];
                    width: number;
                };
            };
            axisTick: {
                splitNumber: number;
                length: number;
                lineStyle: {
                    color: string;
                };
            };
            axisLabel: {
                textStyle: {
                    color: string;
                };
            };
            splitLine: {
                show: boolean;
                length: number;
                lineStyle: {
                    color: string;
                };
            };
            pointer: {
                width: number;
            };
            title: {
                show: boolean;
                offsetCenter: (string | number)[];
                textStyle: {
                    fontWeight: string;
                };
            };
            detail: {
                formatter: string;
                textStyle: {
                    color: string;
                    fontWeight: string;
                    fontSize: number;
                };
            };
            data: any[];
        }[];
    };
}
