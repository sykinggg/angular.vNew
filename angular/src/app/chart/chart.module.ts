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
import { D3Component } from './d3/d3.component';
import { D3DComponent } from './directive/d3-d/d3-d.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
	imports: [
		CommonModule,
		ChartRoutesModule,
		AppUIModule,
		NgZorroAntdModule,
		HttpClientModule,
		FormsModule,
		NgxChartsModule
	],
	declarations: [
		ChartIndexComponent,
		HighChartComponent,
		EChartComponent,
		EchartComponent,
		ChartTemplateComponent,
		HchartComponent,
		D3Component,
		D3DComponent,
	],
})
export class ChartModule { }
