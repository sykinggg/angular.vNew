import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class UpdateService {
    constructor() {}

    updateConfig(config) {
        let toFilterConfig = function (e) {
            if (typeof e === 'string') {
                return {
                    col: e,
                    type: 'eq',
                    values: []
                };
            }
            return e;
        };

        config.keys = config.keys.map(toFilterConfig);
        config.groups = config.groups.map(toFilterConfig);
        if (!config.filters) {
            config.filters = [];
        }

        switch (config.chart_type) {
            case 'pie':
                // the new pie
                if (!config.groups) {
                    config.groups = [];
                }
                break;
            case 'line':
                if (!config.valueAxis) {
                    config.valueAxis = 'vertical';
                }
                break;
        }
    }

    updateBoard(board) {
        if (board.layout) {
            board.layout.rows.forEach(row => {
                if (!row.type) {
                    row.type = 'widget';
                }
            });
        }
    }
}