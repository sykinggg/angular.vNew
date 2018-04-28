import { RouterModule, Routes } from '@angular/router';
import { JsAlgorithmComponent } from './js-algorithm.component';
import { AlgorithmComponent } from './algorithm/algorithm.component';

export const jsAlgorithmRoutes = [
    {
        path: '',
        component: JsAlgorithmComponent,
        children: [
            {
                path: '',
                redirectTo: 'algorithm',
                pathMatch: 'full'
            },
            {
                path: 'algorithm',
                component: AlgorithmComponent
            }
        ]
    }
]