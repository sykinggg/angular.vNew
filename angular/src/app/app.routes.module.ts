import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpComponent } from './http/http.component';
import { templateRoutes } from './template/template.routes';
import {TemplateModule} from "./template/template.module";
import {ObservableModule} from "./observable/observable.module";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
    },
    {
        path: 'module',
        loadChildren: './angular-module/angular-module.module#AngularModuleModule'
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
        path: 'template',
        loadChildren: './template/template.module#TemplateModule'
    },
    {
        path: 'form',
        loadChildren: './form/form.module#FormModule'
    },
    {
        path: 'observable',
        loadChildren: './observable/observable.module#ObservableModule'
    },
    {
        path: 'chart',
        loadChildren: './chart/chart.module#ChartModule'
    },
    {
        path: 'cssSummary',
        loadChildren: './css-summary/css-summary.module#CssSummaryModule'
    },
    {
        path: 'jsSummary',
        loadChildren: './js-summary/js-summary.module#JsSummaryModule'
    },
    {
        path: 'ico',
        loadChildren: './ioc/ioc.module#IocModule'
    }
];

// {
//     path: 'commonDirective',
//     loadChildren: './common-directive/common-directive.module#CommonDirectiveModule'
// },

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
