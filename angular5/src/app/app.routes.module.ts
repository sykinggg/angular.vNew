import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpComponent } from './http/http.component';
import { templateRoutes } from './template/template.routes';
import {TemplateModule} from "./template/template.module";
import {ObservableModule} from "./observable/observable.module";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
    },
    {
        path: 'map',
        loadChildren: './map/map.module#MapModule',
    },
    {
        path: 'http',
        component: HttpComponent
    },
    {
        path: 'Alltemplate',
        loadChildren: './template/template.module#TemplateModule'
    },
    {
        path: 'form',
        loadChildren: './form/form.module#FormModule'
    },
    {
        path: 'observable',
        loadChildren: './observable/observable.module#ObservableModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
