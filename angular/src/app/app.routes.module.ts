import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpComponent } from './http/http.component';
import { TemplateModule } from "./template/template.module";
import { ObservableModule } from "./observable/observable.module";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full'
    },
    {
        path: 'math',
        loadChildren: () => import('./math/math.module').then(m => m.MathModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'module',
        loadChildren: () => import('./angular-module/angular-module.module').then(m => m.AngularModuleModule)
    },
    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule),
    },
    {
        path: 'http',
        component: HttpComponent
    },
    {
        path: 'template',
        loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
    },
    {
        path: 'form',
        loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
        path: 'observable',
        loadChildren: () => import('./observable/observable.module').then(m => m.ObservableModule)
    },
    {
        path: 'chart',
        loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)
    },
    {
        path: 'cssSummary',
        loadChildren: () => import('./css-summary/css-summary.module').then(m => m.CssSummaryModule)
    },
    {
        path: 'jsSummary',
        loadChildren: () => import('./js-summary/js-summary.module').then(m => m.JsSummaryModule)
    },
    {
        path: 'ico',
        loadChildren: () => import('./ioc/ioc.module').then(m => m.IocModule)
    },
    {
        path: 'data-interaction',
        loadChildren: () => import('./data-interaction/data-interaction.module').then(m => m.DataInteractionModule)
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

export class AppRoutingModule { }
