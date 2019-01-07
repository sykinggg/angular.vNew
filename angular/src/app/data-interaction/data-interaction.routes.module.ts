import { NgModule } from '@angular/core';
import { DataInteractionComponent } from './data-interaction/data-interaction.component';
import { RouterModule } from '@angular/router';
import { BaseInteractionComponent } from './base-interaction/base-interaction.component';
import { StockDataComponent } from './stock-data/stock-data.component';
import { HuobiComponent } from './huobi/huobi.component';
import { WeatherComponent } from './weather/weather.component';
import { MapComponent } from './map/map.component';
import { MusicComponent } from './music/music.component';

const dataInteractionRoutes = [
    {
        path: '',
        component: DataInteractionComponent,
        children: [
            {
                path: '',
                redirectTo: 'baseInteraction',
                pathMatch: 'full'
            },
            {
                path: 'baseInteraction',
                component: BaseInteractionComponent
            },
            {
                path: 'stockData',
                component: StockDataComponent
            },
            {
                path: 'huobiData',
                component: HuobiComponent
            },
            {
                path: 'weather',
                component: WeatherComponent
            },
            {
                path: 'gMapData',
                component: MapComponent
            },
            {
                path: 'music',
                component: MusicComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(dataInteractionRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class DataInteractionRoutesModule {}
