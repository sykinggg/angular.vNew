import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CHART_BASIC_OPTION } from '../chart-options';

@Injectable()

export class UpdateEchartOptionsService {

    constructor() {
    }

    public updateEchartOptions(tuningOpt, rawOpt) {
        if (tuningOpt) {
            if (tuningOpt.dataZoom == true) {
                rawOpt.dataZoom = {
                    show: true,
                    start : 0,
                    end: 100
                };
            }
    
            // legend
            rawOpt.grid === undefined ? rawOpt.grid = _.clone(CHART_BASIC_OPTION.grid) : null;
            if (tuningOpt.legendShow == false) {
                rawOpt.grid.top = '5%';
                rawOpt.legend.show =false;
            } else {
                rawOpt.legend === undefined ? rawOpt.legend = _.clone(CHART_BASIC_OPTION.legend) : null;
                tuningOpt.legendX ? rawOpt.legend.x = tuningOpt.legendX : null;
                tuningOpt.legendY ? rawOpt.legend.y = tuningOpt.legendY : null;
                tuningOpt.legendOrient ? rawOpt.legend.orient = tuningOpt.legendOrient : null;
            }
    
            // grid
            if (tuningOpt.gridCustom == true) {
                tuningOpt.gridTop ? rawOpt.grid.top = tuningOpt.gridTop : null;
                tuningOpt.gridBottom ? rawOpt.grid.bottom = tuningOpt.gridBottom : null;
                tuningOpt.gridLeft ? rawOpt.grid.left = tuningOpt.gridLeft : null;
                tuningOpt.gridRight ? rawOpt.grid.right = tuningOpt.gridRight : null;
            }
        }
    };
}