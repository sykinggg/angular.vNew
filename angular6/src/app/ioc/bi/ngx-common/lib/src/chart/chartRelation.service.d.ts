export declare class ChartRelationService {
    constructor();
    render(containerDom: any, option: any, scope: any, persist: any): (o: any) => void;
    parseOption(data: any): {
        tooltip: {
            trigger: string;
            formatter: (params: any) => any;
        };
        toolbox: {
            show: boolean;
            feature: {
                restore: {
                    show: boolean;
                };
                magicType: {
                    show: boolean;
                    type: string[];
                };
                saveAsImage: {
                    show: boolean;
                };
            };
        };
        series: {
            type: string;
            layout: string;
            name: string;
            symbol: string;
            symbolSize: number;
            edgeSymbol: string[];
            edgeSymbolSize: number;
            force: {
                initLayout: string;
                edgeLength: number;
                repulsion: number;
                gravity: number;
                steps: number;
            };
            itemStyle: {
                normal: {
                    label: {
                        show: boolean;
                        position: string;
                        textStyle: {
                            color: string;
                        };
                        formatter: (params: any) => any;
                    };
                    nodeStyle: {
                        brushType: string;
                        borderColor: string;
                        borderWidth: number;
                    };
                };
            };
            lineStyle: {
                normal: {
                    width: string;
                    type: string;
                    curveness: number;
                    opacity: number;
                };
            };
            data: any[];
            links: any[];
        }[];
    };
}
