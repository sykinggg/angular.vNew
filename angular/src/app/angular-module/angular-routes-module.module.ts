import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AngularModuleComponent } from './angular-module.component';
import { AbstractComponent } from './abstract/abstract.component';
import { OtherModuleComponent } from './other-module/other-module.component';
import { DependencyComponent } from './dependency/dependency.component';
import { DiskillComponent } from './diskill/diskill.component';
import { DecoratorComponent } from './decorator/decorator.component';

const moduleRoutes = [
	{
		path: '',
		component: AngularModuleComponent,
		children: [
			{
				path: '',
				redirectTo: 'abstract',
				pathMatch: 'full'
			},
			{
				path: 'abstract',
				component: AbstractComponent
			},
			{
				path: 'other',
				component: OtherModuleComponent
			},
			{
				path: 'dependency',
				component: DependencyComponent
			},
			{
				path: 'diskill',
				component: DiskillComponent
			},
			{
				path: 'decorator',
				component: DecoratorComponent
			}
		]
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(moduleRoutes),
		NgZorroAntdModule
	], 
  	exports: [
		RouterModule,
		NgZorroAntdModule,
	]
})
export class AngularRoutesModuleModule { }
