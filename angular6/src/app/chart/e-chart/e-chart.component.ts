import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-e-chart',
	templateUrl: './e-chart.component.html',
	styleUrls: ['./e-chart.component.scss']
})
export class EChartComponent implements OnInit {

	constructor() { }

	line_simple_option = {
		setOption: {
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line'
			}]
		}
	}

	ReturnchangeData1(data) {
		console.log(data);
	}

	ngOnInit() {
	}

}
