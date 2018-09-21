import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { RoutesModule } from './router/router.module';
import { IocComponent } from './ioc/ioc.component';
import { ReadComponent } from './read/read.component';

@NgModule({
	imports: [
		CommonModule,
		RoutesModule,
		AppUIModule,
		NgZorroAntdModule.forRoot()
	],
	declarations: [
		IocComponent,
		ReadComponent
	]
})
export class IocModule { }
