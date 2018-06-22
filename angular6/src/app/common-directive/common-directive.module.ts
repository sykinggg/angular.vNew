import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDirectiveRoutesModule } from './common-directive-routes.module';
import { AppUIModule } from '../app.ui.module';
import { CommonDirectiveComponent } from './common-directive/common-directive.component';
import { SmallModuleComponent } from './small-module/small-module.component';
import { DragDropFrameComponent } from '../common-directives/drag-drop-frame/drag-drop-frame.component';


@NgModule({
	imports: [
		CommonModule,
		CommonDirectiveRoutesModule,
		AppUIModule
	],
	declarations: [
		CommonDirectiveComponent,
		SmallModuleComponent,
		DragDropFrameComponent
	]
})
export class CommonDirectiveModule { }
