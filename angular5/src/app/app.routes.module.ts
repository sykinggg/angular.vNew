import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpComponent } from './http/http.component';
import { templateRoutes } from './template/template.routes';
import {TemplateModule} from "./template/template.module";
import {ObservableModule} from "./observable/observable.module";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'module/decorator',
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
    },
    {
        path: 'cssSummary',
        loadChildren: './css-summary/css-summary.module#CssSummaryModule'
    },
    {
        path: 'commonDirective',
        loadChildren: './common-directive/common-directive.module#CommonDirectiveModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
