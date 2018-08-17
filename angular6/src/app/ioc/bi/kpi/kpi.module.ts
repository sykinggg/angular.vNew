import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';

import { TreeConfigModule, FormControlService, InformationModule, InputModule,
    ChartModule, ParamSelectorModule, BoardModule } from 'app/pack/common/src/index';
import { ConfigKpiComponent } from 'app/config/kpi/kpi.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgbModule.forRoot(),
        TranslateModule,
        TreeModule,
        DndModule.forRoot(),
        TreeConfigModule,
        InputModule,
        InformationModule,
        RouterModule.forChild([{
            path: '',
            component: ConfigKpiComponent,
        }]),
        ChartModule,
        ParamSelectorModule,
        BoardModule
    ],
    declarations: [
        ConfigKpiComponent
    ]
})

export default class ConfigKpiModule {}