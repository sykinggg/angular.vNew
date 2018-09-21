import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ChartRoutesModule } from './chart-routes.module';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';

import { ChartIndexComponent } from './chart-index/chart-index.component';
import { HighChartComponent } from './high-chart/high-chart.component';
import { EChartComponent } from './e-chart/e-chart.component';
import { EchartComponent } from './directive/echart/echart.component';
import { ChartTemplateComponent } from './directive/chart-template/chart-template.component';
import { HchartComponent } from './directive/hchart/hchart.component';

@NgModule({
	imports: [
		CommonModule,
		ChartRoutesModule,
		AppUIModule,
		NgZorroAntdModule.forRoot(),
		HttpClientModule,
		FormsModule
	],
	declarations: [
		ChartIndexComponent,
		HighChartComponent,
		EChartComponent,
		EchartComponent,
		ChartTemplateComponent,
		HchartComponent,
	],
})
export class ChartModule { }
