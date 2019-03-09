import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-e-chart',
	templateUrl: './e-chart.component.html',
	styleUrls: ['./e-chart.component.scss']
})
export class EChartComponent implements OnInit {

	componentType = 'alone';

	constructor() { }

	eChartOption = {
		title: {
			text: '堆叠区域图'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				areaStyle: { normal: {} },
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				areaStyle: { normal: {} },
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	};

	line_simple_option = {
		init: {
			width: 12,
			height: 300
		},
		setOption: this.eChartOption
	}

	hChartOption = {
		title: {
			text: '阶梯型直线图'
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		series: [{
			data: [1, 2, 3, 4, null, 6, 7, null, 9],
			step: 'right', // 连接线转折对齐
			name: 'Right'
		}, {
			data: [5, 6, 7, 8, null, 10, 11, null, 13],
			step: 'center', // 连接线转折对齐
			name: 'Center'
		}, {
			data: [9, 10, 11, 12, null, 14, 15, null, 17],
			step: 'left', // 连接线转折对齐
			name: 'Left'
		}]
	}

	d3ChartOption = {

	}

	eCharrtOption = {
		fType: 'eChart',
		type: 'line',
		data: this.line_simple_option
	}
	highChartOption = {
		fType: 'highChart',
		type: 'line',
		data: this.hChartOption
	}
	d3Option = {
		fType: 'd3',
		type: 'line',
		data: this.d3ChartOption
	}
	arrOption = [this.eCharrtOption, this.highChartOption, this.d3Option];

	chartOptionArr = [this.line_simple_option];

	ReturnchangeData1(data) {
		// console.log(data);
	}

	chartOptionArrFun(data) {
		// console.log(data);
	}

	ngOnInit() { }
}
