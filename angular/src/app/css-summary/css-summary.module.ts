import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { CssSummaryRoutesModule } from './css-summary.routes.module';

import { CssMiddleComponent } from './css-middle/css-middle.component';
import { CssSummaryComponent } from './css-summary.component';
import { LayoutModule } from '../layout/layout.module';
import { CssSpecialComponent } from './css-special/css-special.component';
import { CssUseSumupComponent } from './css-use-sumup/css-use-sumup.component';

@NgModule({
  imports: [
	  CommonModule,
	  CssSummaryRoutesModule,
	  AppUIModule,
	  NgZorroAntdModule,
	  LayoutModule
  ],
  declarations: [
	  CssMiddleComponent, 
	  CssSummaryComponent, CssSpecialComponent, CssUseSumupComponent
	]
})
export class CssSummaryModule { }
