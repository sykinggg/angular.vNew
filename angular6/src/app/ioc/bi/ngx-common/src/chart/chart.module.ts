import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartDataProcessService } from './common/chartDataProcess.service';
import { CrossTableService } from './common/crossTable.service';
import { UpdateEchartOptionsService } from './common/updateechartOptions.service';
import { ThreeLevelMapService } from './common/threeLevelMap.Service';
import { DataModule } from 'app/pack/common/src/index';

import { CBoardKpiRenderService } from './render/kpiRender.service';
import { CBoardTableRenderService } from './render/tableRender.service';
import { CBoardMapRenderService } from './render/cBoardMapRender.service';
import { CBoardHeatMapRenderService } from './render/cBoardHeatMapRender.service';
import { CBoardBMapRenderService } from './render/cBoardBMapRender.service';

import { ChartService } from './chart.service';
import { ChartKpiService } from './chartKpi.service';
import { ChartLineService } from './chartLine.service';
import { ChartPieService } from './chartPie.service';
import { ChartTableService } from './chartTable.service';
import { ChartFunnelService } from './chartFunnel.service';
import { ChartSankeyService } from './chartSankey.service';
import { ChartRadarService } from './chartRadar.service';
import { ChartMapService } from './chartMap.service';
import { ChartScatterService } from './chartScatter.service';
import { ChartGaugeService } from './chartGauge.service';
import { ChartWordCloudService } from './chartWordCloud.service';
import { ChartTreeMapService } from './chartTreeMap.service';
import { ChartAreaMapService } from './chartAreaMap.service';
import { ChartHeatMapCalendarService } from './chartHeatMapCalendar.service';
import { ChartHeatMapTableService } from './chartHeatMapTable.service';
import { ChartLiquidFillService } from './chartLiquidFill.service';
import { ChartContrastService } from './chartContrast.service';
import { ChartChinaMapService } from './chartChinaMap.service';
import { ChartChinaMapBMapService } from './chartChinaMapBmap.service';
import { ChartRelationService } from './chartRelation.service';

@NgModule({
    imports: [
        CommonModule,
        DataModule
    ],
    providers: [
        ChartDataProcessService,
        CrossTableService,
        UpdateEchartOptionsService,
        CBoardKpiRenderService,
        CBoardTableRenderService,
        ChartService,
        ChartKpiService,
        ChartLineService,
        ChartPieService,
        ChartTableService,
        ChartFunnelService,
        ChartSankeyService,
        ChartRadarService,
        ThreeLevelMapService,
        CBoardMapRenderService,
        ChartMapService,
        ChartScatterService,
        ChartGaugeService,
        ChartWordCloudService,
        ChartTreeMapService,
        ChartAreaMapService,
        ChartHeatMapCalendarService,
        ChartHeatMapTableService,
        ChartLiquidFillService,
        ChartContrastService,
        CBoardHeatMapRenderService,
        ChartChinaMapService,
        CBoardBMapRenderService,
        ChartChinaMapBMapService,
        ChartRelationService,
    ]
})

export class ChartModule {}