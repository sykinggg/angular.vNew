import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { DataModule } from '../data/data.module';
import { ChartModule } from '../chart/chart.module';
import { BoardService } from './board.service';
import { ParamService } from '../param/param.service';
import { BoardWidgetComponent } from './board-widget.component';
import { ModalWidgetComponent } from './modal-widget.component';
import { GenerateReportComponent } from './generate-report.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        TranslateModule,
        DataModule,
        ChartModule
    ],
    declarations: [
        BoardWidgetComponent,
        ModalWidgetComponent,
        GenerateReportComponent
    ],
    entryComponents: [ModalWidgetComponent, GenerateReportComponent],
    exports: [
        CommonModule,
        FormsModule,
        NgbModule,
        TranslateModule,
        DataModule,
        ChartModule,
        BoardWidgetComponent
    ],
    providers: [BoardService, ParamService]
})

export class BoardModule {}