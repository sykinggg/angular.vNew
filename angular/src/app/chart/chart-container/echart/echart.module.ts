import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line/line.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ChartComponent,
        LineComponent
    ],
    entryComponents: [
        ChartComponent,
        LineComponent
    ]
})
export class EchartModule { }

// ng g c chart/chart-container/echart/Line --module echart
