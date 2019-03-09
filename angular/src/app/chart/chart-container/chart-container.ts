import { EChartComponents } from "./echart/echart";
import { HighChartComponents } from "./high-chart/high-chart";
import { D3Components } from "./d3/d3";

export interface IChartDynamicComponent {
    outsideData: any;
}

export const ChartDynamicComponent = {
    eChart: EChartComponents,
    highChart: HighChartComponents,
    d3: D3Components
}
