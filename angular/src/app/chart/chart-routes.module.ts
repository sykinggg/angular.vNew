import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartIndexComponent } from './chart-index/chart-index.component';
import { HighChartComponent } from './high-chart/high-chart.component';
import { EChartComponent } from './e-chart/e-chart.component';
import { Router, RouterModule } from '@angular/router';
import { D3Component } from './d3/d3.component';
import { ThreeComponent } from './three/three.component';

const chartRoutes = [
	{
		path: '',
		component: ChartIndexComponent,
		children: [
			{
				path: '',
				redirectTo: 'eChart',
				pathMatch: 'full'
			},
			{
				path: 'highChart',
				component: HighChartComponent
			},
			{
				path: 'eChart',
				component: EChartComponent
			},
			{
				path: 'three',
				component: ThreeComponent
			}
		]
	}
]
// ,
// 			{
// 				path: 'd3',
// 				component: D3Component
// 			}
@NgModule({
	imports: [
		RouterModule.forChild(chartRoutes)
	],
	exports: [
		RouterModule
	]
})
export class ChartRoutesModule { }
