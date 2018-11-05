import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AbstractComponent } from './abstract/abstract.component';
import { AngularModuleComponent } from './angular-module.component';
import { OtherModuleComponent } from './other-module/other-module.component';
import { AngularRoutesModuleModule } from './angular-routes-module.module';
import { AppUIModule } from '../app.ui.module';
import { DependencyComponent } from './dependency/dependency.component';
import { DiskillComponent } from './diskill/diskill.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
 	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgZorroAntdModule,
		CommonModule,
		AngularRoutesModuleModule,
		AppUIModule,
		LayoutModule
  	],
  	declarations: [
		AbstractComponent, 
		AngularModuleComponent,
		OtherModuleComponent,
		DependencyComponent,
		DiskillComponent,
		DecoratorComponent,
	]
})
export class AngularModuleModule { }
