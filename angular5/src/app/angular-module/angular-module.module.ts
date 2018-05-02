import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractComponent } from './abstract/abstract.component';
import { AngularModuleComponent } from './angular-module.component';
import { OtherModuleComponent } from './other-module/other-module.component';
import { AngularRoutesModuleModule } from './angular-routes-module.module';
import { AppUIModule } from '../app.ui.module';

@NgModule({
 	imports: [
		CommonModule,
		AngularRoutesModuleModule,
		AppUIModule
  	],
  	declarations: [
		AbstractComponent, 
		AngularModuleComponent,
		OtherModuleComponent
	]
})
export class AngularModuleModule { }
