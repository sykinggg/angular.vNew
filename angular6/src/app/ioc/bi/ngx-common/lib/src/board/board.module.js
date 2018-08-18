"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_2 = require("@ngx-translate/core");
var data_module_1 = require("../data/data.module");
var chart_module_1 = require("../chart/chart.module");
var board_service_1 = require("./board.service");
var param_service_1 = require("../param/param.service");
var board_widget_component_1 = require("./board-widget.component");
var modal_widget_component_1 = require("./modal-widget.component");
var generate_report_component_1 = require("./generate-report.component");
var BoardModule = /** @class */ (function () {
    function BoardModule() {
    }
    BoardModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                core_2.TranslateModule,
                data_module_1.DataModule,
                chart_module_1.ChartModule
            ],
            declarations: [
                board_widget_component_1.BoardWidgetComponent,
                modal_widget_component_1.ModalWidgetComponent,
                generate_report_component_1.GenerateReportComponent
            ],
            entryComponents: [modal_widget_component_1.ModalWidgetComponent, generate_report_component_1.GenerateReportComponent],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModule,
                core_2.TranslateModule,
                data_module_1.DataModule,
                chart_module_1.ChartModule,
                board_widget_component_1.BoardWidgetComponent
            ],
            providers: [board_service_1.BoardService, param_service_1.ParamService]
        })
    ], BoardModule);
    return BoardModule;
}());
exports.BoardModule = BoardModule;

//# sourceMappingURL=../../sourcemaps/src/board/board.module.js.map
