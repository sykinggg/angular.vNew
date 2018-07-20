import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { IocComponent } from '../ioc/ioc.component';
import { ReadComponent } from '../read/read.component';

const icoRoutes = [
	{
		path: '',
		component: IocComponent,
		children: [
			{
				path: '',
				redirectTo: 'read',
                pathMatch: 'full'
			},
			{
				path: 'read',
				component: ReadComponent
			}
		]
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(icoRoutes)
	],
	exports: [
		RouterModule
	]
})
export class RoutesModule { }
