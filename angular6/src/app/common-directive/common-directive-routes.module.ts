import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CommonDirectiveComponent } from './common-directive/common-directive.component';
import { SmallModuleComponent } from './small-module/small-module.component';

const CommonDirectiveRoutes = [
	{
		path: '',
		component: CommonDirectiveComponent,
		children: [
			{
				path: '',
				redirectTo: 'smallModule',
				pathMatch: 'full'
			},
			{
				path: 'smallModule',
				component: SmallModuleComponent,
			}
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		NgZorroAntdModule.forRoot(),
		RouterModule.forChild(CommonDirectiveRoutes)
	],
	exports: [
		RouterModule,
		NgZorroAntdModule
	]
})
export class CommonDirectiveRoutesModule { }
