import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JsSummaryRoutesModule } from './js-summary-routes.module';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { JsSummaryIndexComponent } from './js-summary-index/js-summary-index.component';
import { JsSummaryBaseComponent } from './js-summary-base/js-summary-base.component';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		JsSummaryRoutesModule,
		AppUIModule,
		NgZorroAntdModule.forRoot()
	],
	declarations: [
		JsSummaryIndexComponent,
		JsSummaryBaseComponent
	]
})
export class JsSummaryModule { }
