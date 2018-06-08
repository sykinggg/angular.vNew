import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { MapBaseComponent } from './map-base/map-base.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { GmapComponent } from './gmap/gmap.component';

const mapRoutes = [
    {
        path: '',
        component: MapComponent,
        children: [
            {
                path: '',
                redirectTo: 'base',
                pathMatch: 'full'
            },
            {
                path: 'base',
                component: MapBaseComponent
            },
            {
                path: 'search',
                component: MapSearchComponent
            },
            {
                path: 'google',
                component: GmapComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mapRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MapRoutesModule {}
