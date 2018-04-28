import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgZorroAntdModule} from "ng-zorro-antd";
import {ObservableRoutesModule} from "./observable.routes.module";
import {ObservableUiModule} from "./observable.ui.module";

import { SubscriberComponent } from './subscriber/subscriber.component';
import {ObservableComponent} from "./observable.component";
import { RxJsComponent } from './rx-js/rx-js.component';
import { ObservableObjComponent } from './observable-obj/observable-obj.component';
import { ActualCombatComponent } from './actual-combat/actual-combat.component';
import { OtherSkillComponent } from './other-skill/other-skill.component';

@NgModule({
    imports: [
        CommonModule,
        ObservableRoutesModule,
        FormsModule,
        ReactiveFormsModule,
        ObservableUiModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        ObservableComponent,
        SubscriberComponent,
        RxJsComponent,
        ObservableObjComponent,
        ActualCombatComponent,
        OtherSkillComponent
    ]
})
export class ObservableModule { }
