import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutIndexComponent } from './about-index/about-index.component';
import { AboutCreateComponent } from './about-create/about-create.component';

const aboutRoutes = [
    {
        path: '',
        component: AboutComponent,
        children: [
            {
                path: '',
                redirectTo: 'aboutIndex',
                pathMatch: 'full'
            },
            {
                path: 'aboutIndex',
                component: AboutIndexComponent
            },
            {
                path: 'aboutCreate',
                component: AboutCreateComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(aboutRoutes)
    ],
    exports: [RouterModule]
})

export class AboutRoutesModule {}