import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CssSummaryComponent } from './css-summary.component';
import { CssMiddleComponent } from './css-middle/css-middle.component';

const cssSummaryRoutes = [
    {
		path: '',
		component: CssSummaryComponent,
		children: [
			{
				path: '',
				redirectTo: 'cssMiddle',
				pathMatch: 'full'
			},
			{
				path: 'cssMiddle',
				component: CssMiddleComponent
			}
		]
    }
]

@NgModule({
  imports: [
	  RouterModule.forChild(cssSummaryRoutes)
  ],
  exports: [
	  RouterModule
  ]
})
export class CssSummaryRoutesModule { }
