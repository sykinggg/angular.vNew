import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { ApiServer } from 'core-services/core';
import { REQUEST_OPTIONS } from '../request-options';

@Injectable({
    providedIn: 'root',
})

export class ParamService {
    initParamsSubject: Subject<any>;
    quantity: number;

    constructor(
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private translateService: TranslateService,
        private dataServer: ApiServer
    ) {
        this.initParamsSubject = new Subject();
        this.quantity = 0;
    }

    initParam(param: any, rows: any) {
        param.selects = [];
        if (!param.type) {
            param.type = '=';
        }
        if (!param.values) {
            console.log('param.values = []');
            param.values = [];
        }
        if (!param.paramType) {
            param.paramType = 'selector';
        }
        switch (param.paramType) {
            case 'slider':
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
                break;
            case 'date_range':
                let range = this.route.snapshot.queryParams.range;

                if (range) {
                    param.values = range.split('_').map((item) => parseInt(item));
                }
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
                break;
            case 'selector':
                let requestURL: string;

                param.value = '';
                switch (param.col[0].column) {
                    case 'areaid':
                        requestURL = 'param-area';
                        break;
                    case 'ac_base_mac':
                        requestURL = 'param-ac';
                        break;
                    case 'userid':
                        requestURL = 'param-user';
                        break;
                }
                if (requestURL) {
                    this.dataServer.request(requestURL, null, REQUEST_OPTIONS).subscribe((data: any) => {
                        param.selects = data;
                        param.values = param.selects.map((item) => item.value);
                        this.quantity--;
                        this.initParamsSubject.next(this.quantity);
                    });
                } else {
                    this.quantity--;
                    this.initParamsSubject.next(this.quantity);
                }
                break;
            default:
                let getParamsFromWidget = function(widgets: any, col: any): any {
                    let params: any;

                    widgets.some((widget) => {
                        if (widget.widget.id === col.widgetId) {
                            params = {
                                datasourceId: widget.widget.data.datasource,
                                query: JSON.stringify(widget.widget.data.query),
                                datasetId: null
                            };

                            return true;
                        }

                        return false;
                    });

                    return params;
                };

                param.col.forEach((c) => {
                    let p;

                    if (!c.datasetId) {
                        if (rows instanceof Array) {
                            rows.some((row) => {
                                p = getParamsFromWidget(row.widgets, c);

                                return !!p;
                            });
                        } else {
                            p = getParamsFromWidget(rows.widgets, c);
                        }
                    } else {
                        p = {
                            datasourceId: null,
                            query: null,
                            datasetId: c.datasetId
                        };
                    }
                    this.dataServer.post('dimension-values', {
                        ...p,
                        colmunName: c.column
                    }, REQUEST_OPTIONS).subscribe((data: any) => {
                        data.forEach((s) => {
                            if (_.indexOf(param.selects, s) < 0) {
                                param.selects.push(s);
                            }
                        });
                    });
                });
                this.quantity--;
                this.initParamsSubject.next(this.quantity);
        }
    }

    getParamTitle(param: any): string {
        let description: string;

        if (param.paramType === 'selector') {
            if (param.value === '') {
                description = param.name + ' ' + param.type + ' (' + this.translateService.instant('COMMON.ALL') + ')';
            } else {
                description = param.name + ' ' + param.type + ' (' + param.values.map((value) => {
                    let name: string;

                    param.selects.some((option) => {
                        if (value === option.value) {
                            name = option.name;
                            return true;
                        }
                        return false;
                    });

                    return name;
                }) + ')';
            }
        } else {
            switch (param.type) {
                case '=':
                case '≠':
                    description = param.name + ' ' + param.type + ' (' + param.values + ')';
                    break;
                case '>':
                case '<':
                case '≥':
                case '≤':
                    description = param.name + ' ' + param.type + ' ' + param.values;
                    break;
                case '(a,b]':
                case '[a,b)':
                case '(a,b)':
                case '[a,b]':
                    var leftBrackets = param.type.split('a')[0];
                    var rightBrackets = param.type.split('b')[1];

                    try {
                        if (param.paramType === 'slider') {
                            description = param.name + ' between ' + leftBrackets + param.values.map((item) => {
                                let datePattern = /(^\d{4})(\d{2})(\d{2})/;

                                return item.replace(datePattern, '$1-$2-$3');
                            }).join(' , ') + rightBrackets;
                        } else {
                            description = param.name + ' between ' + leftBrackets + param.values.map((item) => {
                                return this.datePipe.transform(new Date(parseInt(item)), 'yyyy-MM-dd HH:mm:ss', 'UTC');
                            }).join(' , ') + rightBrackets;
                        }
                    } catch (error) {
                        description = param.name + ' between ' + leftBrackets + param.values.join(',') + rightBrackets;
                    }
                    break;
                default:
                    description = param.name;
            }
        }

        return description;
    }
}