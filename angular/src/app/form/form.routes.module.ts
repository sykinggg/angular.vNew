import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FormComponent} from "./form.component";
import {UserInputComponent} from "./user-input/user-input.component";
import {FormValidateComponent} from "./form-validate/form-validate.component";
import {FormResponseComponent} from "./form-response/form-response.component";
import {TemplateFormComponent} from "./template-form/template-form.component";
import {DynamicFormComponent} from "./dynamic-form/dynamic-form.component";


const formRoutes = [
    {
        path: '',
        component: FormComponent,
        children: [
            {
                path: '',
                redirectTo: 'userInput',
                pathMatch: 'full'
            },
            {
                path: 'userInput',
                component: UserInputComponent
            },
            {
                path: 'templateForm',
                component: TemplateFormComponent
            },
            {
                path: 'formValidate',
                component: FormValidateComponent
            },
            {
                path: 'formResponse',
                component: FormResponseComponent
            },
            {
                path: 'dynamicForm',
                component: DynamicFormComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(formRoutes),
    ],
    exports: [
        RouterModule,
    ]
})

export class FormRoutesModule {}
