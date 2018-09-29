// https://swimlane.gitbook.io/ngx-charts/v/docs-test/examples/bar-charts
// angular6 + d3
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-d3-d',
    templateUrl: './d3-d.component.html',
    styleUrls: ['./d3-d.component.scss']
})
export class D3DComponent implements OnInit, AfterViewInit {

    @Input() set option(option: any) {

    }
    constructor() { }

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Country';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    single = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];
    multi = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ];

    onSelect(event) {
        console.log(event);
    }
    
    ngOnInit() { }

    ngAfterViewInit() {
    }

}
