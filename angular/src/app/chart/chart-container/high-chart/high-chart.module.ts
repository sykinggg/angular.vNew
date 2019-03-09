import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line/line.component';
import { HChartComponent } from './hchart/hchart.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LineComponent,
        HChartComponent
    ],
    entryComponents: [
        LineComponent
    ],
})
export class HighChartModule { }

// ng g c chart/chart-container/high-chart/line --module high-chart.module
