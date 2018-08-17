import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';

import { TreeConfigModule, FormControlService, InformationModule, InputModule,
    ChartModule, ParamSelectorModule } from 'app/pack/common/src/index';
import { WidgetComponent } from 'app/config/widget/widget.component';

// 弹出框
import { FilterGroupComponent } from 'app/config/widget/manage/filter-group.component';
import { VFilterComponent } from 'app/config/widget/manage/vFilter.component';

// ng-include重写
// import { ConfigComponent } from './chart/template/config.component';
import { WidgetTreeComponent } from './chart/template/tree.component';
import { WidgetDataSourceComponent } from './chart/template/dataSource.component';
import { ChartViewComponent } from './chart/template/chartView.component';

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
            component: WidgetComponent,
        }]),
        ChartModule,
        ParamSelectorModule
    ],
    declarations: [
        FilterGroupComponent,
        VFilterComponent,
        WidgetComponent,
        WidgetDataSourceComponent,
        ChartViewComponent
    ],
    entryComponents: [
        FilterGroupComponent,
        VFilterComponent,
    ],
    exports: [],
    providers: [
        FormControlService
    ]
})

export default class WidgetModule {}