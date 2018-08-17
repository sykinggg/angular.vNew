import { Component, Input } from '@angular/core';

@Component({
    selector: 'chart-group-config',
    template: require('./group.component.html!text')
})

export class ChartGroupConfig {
    constructor() {}

    @Input() curWidget;
    @Input() helpMessage;
    @Input() changeChartStatus;
    @Input() configRule;
    @Input() targetHighlight;
    @Input() editSort;
    @Input() editFilter;
    @Input() toKeysGroups;
    @Input() delKeysGroups;
}