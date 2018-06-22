import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { CssSummaryRoutesModule } from './css-summary.routes.module';

import { CssMiddleComponent } from './css-middle/css-middle.component';
import { CssSummaryComponent } from './css-summary.component';

@NgModule({
  imports: [
	  CommonModule,
	  CssSummaryRoutesModule,
	  AppUIModule,
	  NgZorroAntdModule.forRoot()
  ],
  declarations: [
	  CssMiddleComponent, 
	  CssSummaryComponent
	]
})
export class CssSummaryModule { }
