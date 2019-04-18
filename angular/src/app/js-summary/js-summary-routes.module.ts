import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsSummaryIndexComponent } from './js-summary-index/js-summary-index.component';
import { JsSummaryBaseComponent } from './js-summary-base/js-summary-base.component';
import { RouterModule } from '@angular/router';
import { JsSummarySumComponent } from './js-summary-sum/js-summary-sum.component';

const jsSummaryRoutes = [
	{
		path: '',
		component: JsSummaryIndexComponent,
		children: [
			{
				path: '',
				redirectTo: 'sum',
				pathMatch: 'full'
			},
			{
				path: 'base',
				component: JsSummaryBaseComponent
			},
			{
				path: 'sum',
				component: JsSummarySumComponent
			}
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(jsSummaryRoutes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class JsSummaryRoutesModule { }
