import { Component, Input } from '@angular/core';

@Component({
    selector: 'chart-table-config',
    template: require('./table.component.html!text')
})

export class ChartConfigTable {
    constructor() {}

    @Input() changeChartStatus;
    @Input() targetHighlight;
    @Input() curWidget;
    @Input() editSort;
    @Input() cleanRowSort;
    @Input() cleanVSort;
    @Input() editAlign;
    @Input() editVFilter;
    @Input() configRule;
    
    toCol(list, index, item, type) {
        if (type == 'key' || type == 'group' || type == 'filter') {
            list[index] = {col: item.col, aggregate_type: 'sum'};
        } else if (type == 'select' || type == 'measure') {
            list[index] = {col: item.column, aggregate_type: 'sum'};
        }
        this.changeChartStatus();
    }
}