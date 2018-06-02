import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartIndexComponent } from './chart-index/chart-index.component';
import { HighChartComponent } from './high-chart/high-chart.component';
import { EChartComponent } from './e-chart/e-chart.component';
import { Router, RouterModule } from '@angular/router';

const chartRoutes = [
	{
		path: '',
		component: ChartIndexComponent,
		children: [
			{
				path: '',
				redirectTo: 'highChart',
				pathMatch: 'full'
			},
			{
				path: 'highChart',
				component: HighChartComponent
			},
			{
				path: 'eChart',
				component: EChartComponent
			}
		]
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(chartRoutes)
	],
	exports: [
		RouterModule
	]
})
export class ChartRoutesModule { }
