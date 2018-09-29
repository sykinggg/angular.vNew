import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUIModule } from './about.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd'

import { AboutRoutesModule } from './about.routes.module';

import { AboutComponent } from './about.component';
import { AboutIndexComponent } from './about-index/about-index.component';
import { AboutCreateComponent } from './about-create/about-create.component';


@NgModule({
    imports: [
        CommonModule,
        AboutRoutesModule,
        AboutUIModule,
        NgZorroAntdModule
    ],
    declarations: [
        AboutComponent,
        AboutIndexComponent,
        AboutCreateComponent
    ]
})

export class AboutModule {}