"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var chartDataProcess_service_1 = require("./common/chartDataProcess.service");
var crossTable_service_1 = require("./common/crossTable.service");
var updateechartOptions_service_1 = require("./common/updateechartOptions.service");
var threeLevelMap_Service_1 = require("./common/threeLevelMap.Service");
var index_1 = require("app/pack/common/src/index");
var kpiRender_service_1 = require("./render/kpiRender.service");
var tableRender_service_1 = require("./render/tableRender.service");
var cBoardMapRender_service_1 = require("./render/cBoardMapRender.service");
var cBoardHeatMapRender_service_1 = require("./render/cBoardHeatMapRender.service");
var cBoardBMapRender_service_1 = require("./render/cBoardBMapRender.service");
var chart_service_1 = require("./chart.service");
var chartKpi_service_1 = require("./chartKpi.service");
var chartLine_service_1 = require("./chartLine.service");
var chartPie_service_1 = require("./chartPie.service");
var chartTable_service_1 = require("./chartTable.service");
var chartFunnel_service_1 = require("./chartFunnel.service");
var chartSankey_service_1 = require("./chartSankey.service");
var chartRadar_service_1 = require("./chartRadar.service");
var chartMap_service_1 = require("./chartMap.service");
var chartScatter_service_1 = require("./chartScatter.service");
var chartGauge_service_1 = require("./chartGauge.service");
var chartWordCloud_service_1 = require("./chartWordCloud.service");
var chartTreeMap_service_1 = require("./chartTreeMap.service");
var chartAreaMap_service_1 = require("./chartAreaMap.service");
var chartHeatMapCalendar_service_1 = require("./chartHeatMapCalendar.service");
var chartHeatMapTable_service_1 = require("./chartHeatMapTable.service");
var chartLiquidFill_service_1 = require("./chartLiquidFill.service");
var chartContrast_service_1 = require("./chartContrast.service");
var chartChinaMap_service_1 = require("./chartChinaMap.service");
var chartChinaMapBmap_service_1 = require("./chartChinaMapBmap.service");
var chartRelation_service_1 = require("./chartRelation.service");
var ChartModule = /** @class */ (function () {
    function ChartModule() {
    }
    ChartModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                index_1.DataModule
            ],
            providers: [
                chartDataProcess_service_1.ChartDataProcessService,
                crossTable_service_1.CrossTableService,
                updateechartOptions_service_1.UpdateEchartOptionsService,
                kpiRender_service_1.CBoardKpiRenderService,
                tableRender_service_1.CBoardTableRenderService,
                chart_service_1.ChartService,
                chartKpi_service_1.ChartKpiService,
                chartLine_service_1.ChartLineService,
                chartPie_service_1.ChartPieService,
                chartTable_service_1.ChartTableService,
                chartFunnel_service_1.ChartFunnelService,
                chartSankey_service_1.ChartSankeyService,
                chartRadar_service_1.ChartRadarService,
                threeLevelMap_Service_1.ThreeLevelMapService,
                cBoardMapRender_service_1.CBoardMapRenderService,
                chartMap_service_1.ChartMapService,
                chartScatter_service_1.ChartScatterService,
                chartGauge_service_1.ChartGaugeService,
                chartWordCloud_service_1.ChartWordCloudService,
                chartTreeMap_service_1.ChartTreeMapService,
                chartAreaMap_service_1.ChartAreaMapService,
                chartHeatMapCalendar_service_1.ChartHeatMapCalendarService,
                chartHeatMapTable_service_1.ChartHeatMapTableService,
                chartLiquidFill_service_1.ChartLiquidFillService,
                chartContrast_service_1.ChartContrastService,
                cBoardHeatMapRender_service_1.CBoardHeatMapRenderService,
                chartChinaMap_service_1.ChartChinaMapService,
                cBoardBMapRender_service_1.CBoardBMapRenderService,
                chartChinaMapBmap_service_1.ChartChinaMapBMapService,
                chartRelation_service_1.ChartRelationService,
            ]
        })
    ], ChartModule);
    return ChartModule;
}());
exports.ChartModule = ChartModule;

//# sourceMappingURL=../../sourcemaps/src/chart/chart.module.js.map
