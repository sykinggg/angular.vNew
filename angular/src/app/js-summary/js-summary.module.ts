import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JsSummaryRoutesModule } from './js-summary-routes.module';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { JsSummaryIndexComponent } from './js-summary-index/js-summary-index.component';
import { JsSummaryBaseComponent } from './js-summary-base/js-summary-base.component';
import { LayoutModule } from '../layout/layout.module';
import { JsSummarySumComponent } from './js-summary-sum/js-summary-sum.component';
import { JsTemplateSumComponent } from './js-template-sum/js-template-sum.component';
import { JsTemplateSumDirective } from './js-template-sum/js-template-sum.directive';
import { JsAiComponent } from './js-ai/js-ai.component';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		JsSummaryRoutesModule,
		AppUIModule,
		NgZorroAntdModule,
		LayoutModule
	],
	declarations: [
		JsSummaryIndexComponent,
		JsSummaryBaseComponent,
		JsSummarySumComponent,
		JsTemplateSumComponent,
		JsTemplateSumDirective,
		JsAiComponent
	]
})
export class JsSummaryModule { }
