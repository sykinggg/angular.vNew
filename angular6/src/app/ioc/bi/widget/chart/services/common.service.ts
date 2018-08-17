import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()

export class WidgetCommonService {

    public chart_types_status = {
        "line": true, "pie": true, "kpi": true, "table": true,
        "funnel": true, "sankey": true, "radar": true, "map": true,
        "scatter": true, "gauge": true, "wordCloud": true, "treeMap": true,
        "heatMapCalendar": true, "heatMapTable": true, "liquidFill": true,
        "areaMap": true, "contrast": true,"chinaMap":true,"chinaMapBmap":true,"relation":true
    };

    /***************************************
     *  0:  None items
     *  1:  only 1 item
     * -1:  None Restrict
     *  2:  1 or more
     ***************************************/
    public configRule = {
        line: {keys: 2, groups: -1, filters: -1, values: 2},
        pie: {keys: 2, groups: -1, filters: -1, values: 2},
        kpi: {keys: 0, groups: 0, filters: -1, values: 1},
        table: {keys: -1, groups: -1, filters: -1, values: -1},
        funnel: {keys: -1, groups: 0, filters: -1, values: 2},
        sankey: {keys: 2, groups: 2, filters: -1, values: 1},
        radar: {keys: 2, groups: -1, filters: -1, values: 2},
        map: {keys: 2, groups: -1, filters: -1, values: 2},
        scatter: {keys: 2, groups: -1, filters: -1, values: 2},
        gauge: {keys: 0, groups: 0, filters: -1, values: 1},
        wordCloud: {keys: 2, groups: 0, filters: -1, values: 1},
        treeMap: {keys: 2, groups: 0, filters: -1, values: 1},
        areaMap: {keys: 2, groups: -1, filters: -1, values: 1},
        heatMapCalendar: {keys: 1, groups: 0, filters: -1, values: 1},
        heatMapTable: {keys: 2, groups: 2, filters: -1, values: 1},
        liquidFill: {keys: 0, groups: 0, filters: -1, values: 1},
        contrast: {keys: 1, groups: 0, filters: -1, values: 2},
        chinaMap:{keys: 2, groups: -1, filters: -1, values: 2},
        chinaMapBmap:{keys: 2, groups: -1, filters: -1, values: 2},
        relation: {keys: 2, groups: 2, filters: -1, values: 1}
    };

    public curWidget;

    constructor() {}

    public changeChartStatus() {
        for (var type in this.chart_types_status) {
            var rule = this.configRule[type];
            var config = this.curWidget.config;
            var flattenValues = [];
            _.each(config.values, function (v) {
                flattenValues = flattenValues.concat(v.cols);
            });
            if (_.size(config.keys) == 0 && _.size(config.groups) == 0 && _.size(flattenValues) == 0) {
                r = false;
            } else {
                for (var k in rule) {
                    var r = true;
                    if (rule[k] == 2) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) >= 1);
                            if (type == 'contrast') {
                                r = (_.size(flattenValues) == 2); //限制values数量为2
                            }
                        } else {
                            r = (_.size(config[k]) >= 1);
                        }
                    } else if (rule[k] != -1) {
                        if (k == 'values') {
                            r = (_.size(flattenValues) == rule[k]);
                        } else {
                            r = (_.size(config[k]) == rule[k]);
                        }
                    }
                    if (!r) {
                        this.chart_types_status[type] = r;
                        break;
                    }
                }
            }
            this.chart_types_status[type] = r;
        }
    };
}