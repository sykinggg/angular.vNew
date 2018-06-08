import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NzMessageService } from 'ng-zorro-antd';

import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import * as uuidV1 from 'uuid/v1';

@Component({
	selector: 'app-high-chart',
	templateUrl: './high-chart.component.html',
	styleUrls: ['./high-chart.component.scss']
})
export class HighChartComponent implements OnInit {

	public highChart: any;
	public highChartLocalData: any;

	constructor(
		private http: HttpClient, 
		private message: NzMessageService) { 
		this.highChart = [
			{
				config: {
					title: {
							text: '普通折线图'
					},
					subtitle: {
							text: '数据来源：thesolarfoundation.com'
					},
					yAxis: {
							title: {
									text: '就业人数'
							}
					},
					legend: {
							layout: 'vertical',
							align: 'right',
							verticalAlign: 'middle'
					},
					plotOptions: {
							series: {
									label: {
											connectorAllowed: false
									},
									pointStart: 2010
							}
					},
					series: [],
					responsive: {
							rules: [{
									condition: {
											maxWidth: 500
									},
									chartOptions: {
											legend: {
													layout: 'horizontal',
													align: 'center',
													verticalAlign: 'bottom'
											}
									}
							}]
					}
				},
				url: 'OrdinaryLineChart',
				writeID: ['series']
			},
			{
				config: {
					chart: {
						type: 'line'
					},
					title: {
						text: '显示点值的折线图'
					},
					subtitle: {
						text: '数据来源: WorldClimate.com'
					},
					xAxis: {
						categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
					},
					yAxis: {
						title: {
							text: '气温 (°C)'
						}
					},
					plotOptions: {
						line: {
							dataLabels: {
								// 开启数据标签
								enabled: true          
							},
							// 关闭鼠标跟踪，对应的提示框、点击事件会失效
							enableMouseTracking: false
						}
					},
					series: []
				},
				url: "LineChartShowingPointValue",
				writeID: ['series']
			},
			{
				config: {
					chart: {
						type: 'area',
						zoomType: 'x',
						panning: true,
						panKey: 'shift'
					},
					title: {
						text: '包含标注的折线图'
					},
					annotations: [],
					xAxis: {
						labels: {
							format: '{value} km'
						},
						minRange: 5,
						title: {
							text: '距离'
						}
					},
					yAxis: {
						startOnTick: true,
						endOnTick: false,
						maxPadding: 0.35,
						title: {
							text: null
						},
						labels: {
							format: '{value} m'
						}
					},
					tooltip: {
						headerFormat: '距离: {point.x:.1f} km<br>',
						pointFormat: '海拔：{point.y} m ',
						shared: true
					},
					legend: {
						enabled: false
					},
					series: [{
						data: [],
						lineColor: Highcharts.getOptions().colors[1],
						color: Highcharts.getOptions().colors[2],
						fillOpacity: 0.5,
						name: '海拔',
						marker: {
							enabled: false
						},
						threshold: null
					}]
				},
				url: 'LineChartWithLabels',
				writeID: ['series.data', 'annotations']
			},
			{
				config: {
					chart: {
						zoomType: 'x'
					},
					title: {
						text: '可缩放的时间轴'
					},
					subtitle: {
						text: document.ontouchstart === undefined ?
						'鼠标拖动可以进行缩放' : '手势操作进行缩放'
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					tooltip: {
						dateTimeLabelFormats: {
							millisecond: '%H:%M:%S.%L',
							second: '%H:%M:%S',
							minute: '%H:%M',
							hour: '%H:%M',
							day: '%Y-%m-%d',
							week: '%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					yAxis: {
						title: {
							text: '汇率'
						}
					},
					legend: {
						enabled: false
					},
					plotOptions: {
						area: {
							fillColor: {
								linearGradient: {
									x1: 0,
									y1: 0,
									x2: 0,
									y2: 1
								},
								stops: [
									[0, Highcharts.getOptions().colors[0]]
								]
							},
							marker: {
								radius: 2
							},
							lineWidth: 1,
							states: {
								hover: {
									lineWidth: 1
								}
							},
							threshold: null
						}
					},
					series: [{
						type: 'area',
						name: '美元兑欧元',
						data: []
					}]
				},
				asynDataUrl: 'https://data.jianshukeji.com/jsonp?filename=json/usdeur.json',
				writeID: ['series.data']
			},
			{
				config: {
					chart: {
						type: 'spline',
						inverted: true
					},
					title: {
						text: '坐标反转的曲线图'
					},
					subtitle: {
						text: '根据标准大气模型绘制'
					},
					xAxis: {
						reversed: false,
						title: {
							enabled: true,
							text: '海拔高度'
						},
						labels: {
							formatter: function () {
								return this.value + 'km';
							}
						},
						maxPadding: 0.05,
						showLastLabel: true
					},
					yAxis: {
						title: {
							text: '温度'
						},
						labels: {
							formatter: function () {
								return this.value + '°';
							}
						},
						lineWidth: 2
					},
					legend: {
						enabled: false
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br/>',
						pointFormat: '{point.x} km: {point.y}°C'
					},
					plotOptions: {
						spline: {
							marker: {
								enable: false
							}
						}
					},
					series: []
				},
				url: 'CoordinateReversalCurve',
				writeID: ['series']
			},
			{
				config: {
					chart: {
						type: 'spline'
					},
					title: {
						text: '带标识的曲线图'
					},
					subtitle: {
						text: '数据来源: WorldClimate.com'
					},
					xAxis: {
						categories: ['一月', '二月', '三月', '四月', '五月', '六月',
									 '七月', '八月', '九月', '十月', '十一月', '十二月']
					},
					yAxis: {
						title: {
							text: '温度'
						},
						labels: {
							formatter: function () {
								return this.value + '°';
							}
						}
					},
					tooltip: {
						crosshairs: true,
						shared: true
					},
					plotOptions: {
						spline: {
							marker: {
								radius: 4,
								lineColor: '#666666',
								lineWidth: 1
							}
						}
					},
					series: []
				},
				url: 'MarkedGraph',
				writeID: ['series']
			},
			{
				config: {
					chart: {
						type: 'spline'
					},
					title: {
						text: '带标识区域的曲线图'
					},
					subtitle: {
						text: '2009年10月6日和7日两地风速情况'
					},
					xAxis: {
						type: 'datetime',
						labels: {
							overflow: 'justify'
						}
					},
					yAxis: {},
					tooltip: {
						valueSuffix: ' m/s'
					},
					plotOptions: {
						spline: {
							lineWidth: 4,
							states: {
								hover: {
									lineWidth: 5
								}
							},
							marker: {
								enabled: false
							},
							pointInterval: 3600000, // one hour
							pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
						}
					},
					series: [],
					navigation: {
						menuItemStyle: {
							fontSize: '10px'
						}
					}
				},
				url: 'GraphWithMarkedArea',
				writeID: ['yAxis', 'series']
			},
			{
				config: {
					chart: {
						type: 'spline'
					},
					title: {
						text: '时间不连续的曲线图'
					},
					subtitle: {
						text: '非规律性时间内的变化'
					},
					xAxis: {
						type: 'datetime',
						title: {
							text: null
						}
					},
					yAxis: {
						title: {
							text: '积雪 厚度 (m)'
						},
						min: 0
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
					},
					plotOptions: {
						spline: {
							marker: {
								enabled: true
							}
						}
					},
					series: []
				},
				url: 'TimeDiscontinuousGraph',
				writeID: ['series']
			}
		]
	}

	ngOnInit() {
		this.defaultChartId();
		this.http.get("assets/highChartData.json").subscribe(
			data => {
				this.highChartLocalData = data;
				this.getChartData();
			}, 
			err => {
				console.log(err);
			}
		)
		
	}

	ngAfterViewInit() {
		this.defaultChart();
	}

	defaultChartId() {
		this.highChart.map(item => {
			item.id = uuidV1();
			item.render = false;
		})
	}

	defaultChart() {
		this.highChart.map(item => {
			if(item.render) {
				Highcharts.chart(item.id, item.config);
				item.render = false;
			}
		})
	}

	getChartData() {
		setTimeout(() => {
			this.highChart.map(item => {
				if(item.url) {
					item.writeID.map(key => {
						if(key.indexOf('.')+1) {
							let getFlag = key.split('.');
							if(getFlag[0] == 'series') {
								if(item.config[getFlag[0]][0][getFlag[1]] && !item.config[getFlag[0]][0][getFlag[1]].length) {
									item.config[getFlag[0]][0][getFlag[1]] = eval(this.highChartLocalData[item.url][getFlag[1]]);
									item.render = true;
								}
							}
						}else{
							if(item.config[key] && !item.config[key].length) {
								item.config[key] = eval(this.highChartLocalData[item.url][key]);
								// if(key == 'series') {
								// 	if(item.config[key].length) {
								// 		item.config[key].map(Citem => {
								// 			if(Citem.data.length) {
								// 				Citem.data.map(CDitem => {
								// 					if(CDitem.length) {
								// 						CDitem.map(CDTitem => {
								// 							CDTitem = eval(CDTitem);
								// 						})
								// 					}
								// 				})
								// 			}
								// 		})
								// 	}
								// }
								item.render = true;
							}
						}
					})
					// console.log(item);
					// if(item.config.annotations && !item.config.annotations.length) {
					// 	item.config.annotations = this.highChartLocalData[item.url].annotations;
					// 	item.render = true;
					// }
					// if(item.config.series.length) {
					// 	item.config.series.map((series, idx) => {
					// 		series.data = this.highChartLocalData[item.url].data[idx];
					// 		item.render = true;
					// 	})
					// }else{
					// 	item.config.series = this.highChartLocalData[item.url].series;
					// 	item.render = true;
					// }
				}
				if(item.asynDataUrl) {
					this.http.get(item.asynDataUrl, {responseType: 'text'}).subscribe(
						(data) => {
							data = data.replace('?', '');
							let useData = eval(data);
							if(item.config.series.length) {
								item.config.series.map((series, idx) => {
									series.data = useData;
								})
								item.render = true;
							}
							this.defaultChart();
						},
						(err) => {
							console.log(err);
							this.message.create('error', `没链外网，等跪吧！`);
						}
					)
				}
			})
			this.defaultChart();
		})
	}

}
