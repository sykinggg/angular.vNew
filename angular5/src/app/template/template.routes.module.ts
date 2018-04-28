import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './template/template.component';
import { AllTemplateComponent } from './template.component';
import { ComponentInteractionComponent } from './component-interaction/component-interaction.component';
import { AttrDirectiveComponent } from './attr-directive/attr-directive.component';
import { StrDirectiveComponent } from './str-directive/str-directive.component';
import { PipeComponent } from './pipe/pipe.component';
import { AnimationsComponent } from './animations/animations.component';

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
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(templateRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TemplateRoutesModule {}
