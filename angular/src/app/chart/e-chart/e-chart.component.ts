import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-e-chart',
	templateUrl: './e-chart.component.html',
	styleUrls: ['./e-chart.component.scss']
})
export class EChartComponent implements OnInit {

	componentType = 'alone';
	text = {
		Input: 'Input',
		Textarea: 'Textarea',
		Select: 'option'
	}

	constructor(
		private http: HttpClient
	) { }

	get() {
		this.http.get('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	put() {
		this.http.put('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	delete() {
		this.http.delete('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	post() {
		this.http.post('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	options() {
		this.http.options('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	patch() {
		this.http.patch('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	head() {
		this.http.head('http://127.0.0.1:666/test', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	dbpost() {
		this.http.post('http://127.0.0.1:666/cats', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	dbget() {
		this.http.get('http://127.0.0.1:666/cats', {
			params: this.text
		}).subscribe(res => {
			console.log(res);
		})
	}

	set5aavPic() {
		this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type: '5aav' } }).subscribe(res => {
			console.log(res);
		})
	}

	setjiandanPic() {
		this.http.get('http://127.0.0.1:666/pic/picSet', { params: { type: 'jiandan' } }).subscribe(res => {
			console.log(res);
		})
	}

	imgData = [];
	get5aavPic() {
		this.http.get('http://127.0.0.1:666/pic/5aavGet', { params: { type: '5aav' } }).subscribe(res => {
			console.log(res);
			if (res[0].address) {
				this.imgData = res[0].address;
			}
		})
	}

	getJiandanPic() {
		this.http.get('http://127.0.0.1:666/pic/5aavGet', { params: { type: 'jiandan' } }).subscribe(res => {
			console.log(res);
			if (res[0].address) {
				this.imgData = res[0].address;
			}
		})
	}

	delete5aavPic() {
		this.http.delete('http://127.0.0.1:666/pic/all').subscribe(res => {
			console.log(res);
		})
	}

	line_simple_option = {
		init: {
			width: 12,
			height: 300
		},
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

	chartOptionArr = [this.line_simple_option];

	ReturnchangeData1(data) {
		// console.log(data);
	}

	chartOptionArrFun(data) {
		// console.log(data);
	}

	ngOnInit() {
	}

}
