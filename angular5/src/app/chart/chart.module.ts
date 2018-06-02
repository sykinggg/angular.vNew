import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChartRoutesModule } from './chart-routes.module';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ChartIndexComponent } from './chart-index/chart-index.component';
import { HighChartComponent } from './high-chart/high-chart.component';
import { EChartComponent } from './e-chart/e-chart.component';

@NgModule({
	imports: [
		CommonModule,
		ChartRoutesModule,
		AppUIModule,
		NgZorroAntdModule.forRoot(),
		HttpClientModule
	],
	declarations: [
		ChartIndexComponent, 
		HighChartComponent, 
		EChartComponent
	]
})
export class ChartModule { }