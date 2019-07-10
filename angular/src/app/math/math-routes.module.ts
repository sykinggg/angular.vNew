import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathIndexComponent } from './math-index/math-index.component';
import { RouterModule } from '@angular/router';
import { MathFirstGradeComponent } from './math-first-grade/math-first-grade.component';

const mathRoutes = [
	{
		path: '',
		component: MathIndexComponent,
		children: [
			{
				path: '',
				redirectTo: 'firstGrade',
				pathMatch: 'full'
			},
			{
				path: 'firstGrade',
				component: MathFirstGradeComponent
			}
		]
	}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(mathRoutes)
	],
	exports: [
		RouterModule
	],
	declarations: []
})
export class MathRoutesModule { }
