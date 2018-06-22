import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FormRoutesModule} from "./form.routes.module";
import {FormUi} from "./form.ui.module";
import { NgZorroAntdModule } from 'ng-zorro-antd';


import {FormComponent} from "./form.component";
import {UserInputComponent} from "./user-input/user-input.component";
import {FormValidateComponent} from "./form-validate/form-validate.component";
import {FormResponseComponent} from "./form-response/form-response.component";
import {TemplateFormComponent} from "./template-form/template-form.component";
import { FormResponseDetailComponent } from './form-response-detail/form-response-detail.component';
import { FormResponseListComponent } from './form-response-list/form-response-list.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicService } from '../service/dynamic/dynamic.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FormRoutesModule,
        FormUi,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        FormComponent,
        UserInputComponent,
        TemplateFormComponent,
        FormValidateComponent,
        FormResponseComponent,
        FormResponseDetailComponent,
        FormResponseListComponent,
        DynamicFormComponent
    ],
    providers: [DynamicService],
})

export class FormModule {}
