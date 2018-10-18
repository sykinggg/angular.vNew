import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataInteractionRoutesModule } from './data-interaction.routes.module';
import { AppUIModule } from '../app/app.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';

import { WaterFullComponent } from '../app/common-directives/water-full/water-full.component';

import { DataInteractionComponent } from './data-interaction/data-interaction.component';
import { BaseInteractionComponent } from './base-interaction/base-interaction.component';

@NgModule({
    imports: [
        CommonModule,
        DataInteractionRoutesModule,
        AppUIModule,
        NgZorroAntdModule,
		HttpClientModule,
		FormsModule,
    ],
    declarations: [
        WaterFullComponent,
        DataInteractionComponent, 
        BaseInteractionComponent
    ]
})
export class DataInteractionModule { }
