import { RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { homeRoutes } from './home/home.routes';
import { studyRoutes } from './study/study.routes';
import { UiStudyComponent } from './ui-study/ui-study.component';
import { MapStudyComponent } from './map-study/map-study.component';
import { jsAlgorithmRoutes } from './js-algorithm/js-algorithm.routes';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
    {
        path: 'home',
        // component: HomeComponent
        children: homeRoutes
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'study',
        children: studyRoutes
    },
    {
        path: 'mapStudy',
        component: MapStudyComponent
    },
    {
        path: 'uiStudy',
        component: UiStudyComponent
    },
    {
        path: 'JsAlgorithm',
        children: jsAlgorithmRoutes
    }
]
