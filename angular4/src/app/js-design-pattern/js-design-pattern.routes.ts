import { RouterModule, Routes } from '@angular/router';
import{JsDesignPatternComponent}from'./js-design-pattern.component';
import{OpjectOrientedComponent}from'./opject-oriented/opject-oriented.component';

export const JsDesignPatternRoutes = [
    {
        path: '',
        component: JsDesignPatternComponent,
        children: [
            {
                path: '',
                redirectTo: 'OpjectOriented',
                pathMatch: 'full'
            },
            {
                path: 'OpjectOriented',
                component: OpjectOrientedComponent
            }
        ]
    }
]