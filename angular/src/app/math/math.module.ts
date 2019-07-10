import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathIndexComponent } from './math-index/math-index.component';
import { MathFirstGradeComponent } from './math-first-grade/math-first-grade.component';
import { MathServiceService } from '../service/math-service/math-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppUIModule } from '../app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from '../layout/layout.module';
import { MathRoutesModule } from './math-routes.module';

@NgModule({
    imports: [
        FormsModule,
		ReactiveFormsModule,
		CommonModule,
		AppUIModule,
		NgZorroAntdModule,
        LayoutModule,
        MathRoutesModule
    ],
    declarations: [
        MathIndexComponent,
        MathFirstGradeComponent
    ],
    providers: [
        MathServiceService
    ]
})
export class MathModule { }
