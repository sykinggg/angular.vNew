import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MapComponent } from '../map/map.component';
import { UiComponent } from '../ui/ui.component';
import { DirectiveExplainComponent } from '../directive-explain/directive-explain.component';
import { JsDesignPatternRoutes } from '../js-design-pattern/js-design-pattern.routes';
import { LessMixinsComponent } from './less-mixins/less-mixins.component';
import { componentInstanceRoutes } from '../component-instance/component-instance.routes';
export const homeRoutes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'map',
                pathMatch: 'full'
            },
            {
                path: 'map',
                component: MapComponent
            },
            {
                path: 'ui',
                component: UiComponent
            },
            {
                path: 'directive',
                component: DirectiveExplainComponent
            },
            {
                path: 'JsDPRoutes',
                children: JsDesignPatternRoutes
            },
            {
                path: 'LessMixins',
                component: LessMixinsComponent
            },
            {
                path: 'componentInstance',
                children: componentInstanceRoutes
            }
        ]
    }
]