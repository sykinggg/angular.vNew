import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataInteractionRoutesModule } from './data-interaction.routes.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';


import { DataInteractionComponent } from './data-interaction/data-interaction.component';
import { BaseInteractionComponent } from './base-interaction/base-interaction.component';
import { AppUIModule } from '../app.ui.module';
import { LayoutModule } from '../layout/layout.module';
import { StockDataComponent } from './stock-data/stock-data.component';
import { DateStringPipe } from './pipe/date-string/date-string.pipe';
import { HuobiComponent } from './huobi/huobi.component';
import { WeatherComponent } from './weather/weather.component';
import { MapComponent } from './map/map.component';
import { MusicComponent } from './music/music.component';
import { ForeignExchangeComponent } from './foreign-exchange/foreign-exchange.component';
import { HousesComponent } from './houses/houses.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';


@NgModule({
    imports: [
        CommonModule,
        DataInteractionRoutesModule,
        AppUIModule,
        NgZorroAntdModule,
		HttpClientModule,
        FormsModule,
        LayoutModule,
        CommonDirectivesModule
    ],
    declarations: [
        DataInteractionComponent, 
        BaseInteractionComponent,
        StockDataComponent,
        DateStringPipe,
        HuobiComponent,
        WeatherComponent,
        MapComponent,
        MusicComponent,
        ForeignExchangeComponent,
        HousesComponent
    ]
})
export class DataInteractionModule { }
