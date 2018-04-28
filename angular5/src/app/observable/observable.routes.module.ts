import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ObservableComponent} from "./observable.component";
import {SubscriberComponent} from "./subscriber/subscriber.component";
import { RxJsComponent } from './rx-js/rx-js.component';
import {ObservableObjComponent} from "./observable-obj/observable-obj.component";
import {ActualCombatComponent} from "./actual-combat/actual-combat.component";
import {OtherSkillComponent} from "./other-skill/other-skill.component";

const observableRoutes = [
    {
        path: '',
        component: ObservableComponent,
        children: [
            {
                path: '',
                redirectTo: 'subscriber',
                pathMatch: 'full'
            },
            {
                path: 'subscriber',
                component: SubscriberComponent
            },
            {
                path: 'RxJs',
                component: RxJsComponent
            },
            {
                path: 'observableObj',
                component: ObservableObjComponent
            },
            {
                path: 'actualCombat',
                component: ActualCombatComponent
            },
            {
                path: 'otherSkill',
                component: OtherSkillComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(observableRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ObservableRoutesModule {}
