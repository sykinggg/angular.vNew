import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { TemplateComponent } from './template/template.component';
import { AllTemplateComponent } from './template.component';
import { ComponentInteractionComponent } from './component-interaction/component-interaction.component';
import { AttrDirectiveComponent } from './attr-directive/attr-directive.component';
import { StrDirectiveComponent } from './str-directive/str-directive.component';
import { PipeComponent } from './pipe/pipe.component';
import { AnimationsComponent } from './animations/animations.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';

const templateRoutes = [
    {
        path: '',
        component: AllTemplateComponent,
        children: [
            {
                path: '',
                redirectTo: 'tempalte',
                pathMatch: 'full'
            },
            {
                path: 'tempalte',
                component: TemplateComponent
            },
            {
                path: 'interaction',
                component: ComponentInteractionComponent
            },
            {
                path: 'attrDir',
                component: AttrDirectiveComponent
            },
            {
                path: 'strDir',
                component: StrDirectiveComponent
            },
            {
                path: 'pipe',
                component: PipeComponent
            },
            {
                path: 'animations',
                component: AnimationsComponent
            },
            {
                path: 'dynamic-component',
                component: DynamicComponentComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(templateRoutes),
        NgZorroAntdModule
    ],
    exports: [
        RouterModule,
        NgZorroAntdModule
    ]
})

export class TemplateRoutesModule {}
