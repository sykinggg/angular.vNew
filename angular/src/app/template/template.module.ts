import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TemplateRoutesModule} from "./template.routes.module";
import {TemplateUiModule} from "./template.ui.module";

import {TemplateComponent} from "./template/template.component";
import {AllTemplateComponent} from "./template.component";
import {ComponentInteractionComponent} from "./component-interaction/component-interaction.component";
import {AttrDirectiveComponent} from "./attr-directive/attr-directive.component";
import {StrDirectiveComponent} from "./str-directive/str-directive.component";
import {PipeComponent} from "./pipe/pipe.component";
import {AnimationsComponent} from "./animations/animations.component";
import {ComponentInteractionChildComponent} from "./component-interaction/component-interaction-child/component-interaction-child.component";

import { AttrFirstDirectiveDirective } from '../directive/attr-first-directive/attr-first-directive.directive';
import { AttrSecondDirectiveDirective } from '../directive/attr-second-directive/attr-second-directive.directive';
import { AttrThirdDirectiveDirective } from '../directive/attr-third-directive/attr-third-directive.directive';
import { StrFirstDirectiveDirective } from '../directive/str-first-directive/str-first-directive.directive';
import { ExponentialStrengthPipePipe } from '../pipe/exponential-strength-pipe/exponential-strength-pipe.pipe';
import { PipeFirstPipe } from '../pipe/pipe-first/pipe-first.pipe';
import { PipeHttpPipe } from '../pipe/pipe-http/pipe-http.pipe';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { DemoComponent } from './dynamic-component/demo/demo.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TemplateRoutesModule,
        TemplateUiModule,
        LayoutModule
    ],
    declarations: [
        TemplateComponent,
        AllTemplateComponent,
        ComponentInteractionComponent,
        ComponentInteractionChildComponent,
        AttrDirectiveComponent,
        StrDirectiveComponent,
        PipeComponent,
        AnimationsComponent,
    
        AttrFirstDirectiveDirective,
        AttrSecondDirectiveDirective,
        AttrThirdDirectiveDirective,
        StrFirstDirectiveDirective,
        ExponentialStrengthPipePipe,
        PipeFirstPipe,
        PipeHttpPipe,
        DynamicComponentComponent,
        DemoComponent,
    ]
})

export class TemplateModule {}
