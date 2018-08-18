import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';

import { TreeConfigModule, InformationModule, InputModule,
    ChartModule, ParamSelectorModule, BoardModule } from 'app/pack/common/src/index';
import { KpiComponent } from './kpi.component';

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
        ChartModule,
        ParamSelectorModule,
        BoardModule
    ],
    declarations: [
        KpiComponent
    ]
})

export class KpiModule {}