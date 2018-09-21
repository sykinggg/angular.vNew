import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsSummaryIndexComponent } from './js-summary-index/js-summary-index.component';
import { JsSummaryBaseComponent } from './js-summary-base/js-summary-base.component';
import { RouterModule } from '@angular/router';

const jsSummaryRoutes = [
	{
		path: '',
		component: JsSummaryIndexComponent,
		children: [
			{
				path: '',
				redirectTo: 'base',
				pathMatch: 'full'
			},
			{
				path: 'base',
				component: JsSummaryBaseComponent
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
