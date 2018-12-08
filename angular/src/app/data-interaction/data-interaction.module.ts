import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataInteractionRoutesModule } from './data-interaction.routes.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';


import { DataInteractionComponent } from './data-interaction/data-interaction.component';
import { BaseInteractionComponent } from './base-interaction/base-interaction.component';
import { AppUIModule } from '../app.ui.module';
import { WaterFullComponent } from '../common-directives/water-full/water-full.component';
import { LayoutModule } from '../layout/layout.module';
import { StockDataComponent } from './stock-data/stock-data.component';
import { DateStringPipe } from './pipe/date-string/date-string.pipe';
import { HuobiComponent } from './huobi/huobi.component';
import { WeatherComponent } from './weather/weather.component';
import { WaterFullMovieComponent } from '../common-directives/water-full-movie/water-full-movie.component';
import { AddressLinkageComponent } from '../common-directives/address-linkage/address-linkage.component';

@NgModule({
    imports: [
        CommonModule,
        DataInteractionRoutesModule,
        AppUIModule,
        NgZorroAntdModule,
		HttpClientModule,
        FormsModule,
        LayoutModule
    ],
    declarations: [
        WaterFullComponent,
        DataInteractionComponent, 
        BaseInteractionComponent,
        StockDataComponent,
        DateStringPipe,
        HuobiComponent,
        WaterFullMovieComponent,
        WeatherComponent,
        AddressLinkageComponent
    ]
})
export class DataInteractionModule { }
