import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartModule } from './echart/echart.module';
import { ChartContainerDirective } from './chart-container.directive';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { HighChartModule } from './high-chart/high-chart.module';
import { D3Module } from './d3/d3.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        EchartModule,
        HighChartModule,
        D3Module
    ],
    declarations: [
        ChartContainerDirective,
        ChartContainerComponent,
    ],
    exports: [
        ChartContainerDirective,
        ChartContainerComponent,
    ]
})
export class ChartContainerModule { }

// ng g m chart/chart-container/HighChart --module chart-container.module
// ng g c chart/chart-container/chart-container --module chart-container.module
// ng g d chart/chart-container/chart-container --module chart-container.module
