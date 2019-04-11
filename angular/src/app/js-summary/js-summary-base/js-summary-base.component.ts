import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-js-summary-base',
	templateUrl: './js-summary-base.component.html',
	styleUrls: ['./js-summary-base.component.scss']
})
export class JsSummaryBaseComponent implements OnInit {

	public headSummary: Array<any> = [
		{
			active: true,
			name: '1 开闭原则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<ul>
					<li>类、模块和函数应该对扩展开放，对修改关闭</li>
					<li>当需要变化时，不修改原有代码</li>
				</ul>
			`)
		},
		{
			active: false,
			name: '2 里氏代换原则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<ul>
					<li>任何基类可以出现的地方，子类一定可以出现</li>
					<li>只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用</li>
					<li>衍生类也能够在基类的基础上增加新的行为</li>
					<li>子类可以扩展父类的功能，但不能改变父类原有的功能</li>
				</ul>
			`)
		},
		{
			active: false,
			name: '3 单一职责原则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p>一个类只负责一项职责</p>
			`)
		},
		{
			active: false,
			name: '4 依赖倒置原则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<ul>
					<li>高层模块不应该依赖低层模块，二者都应该依赖其抽象</li>
					<li>多用抽象的接口来描述相同的动作</li>
					<li>降低实现这个动作的人和物之间的耦合度</li>
				</ul>
			`)
		},
		{
			active: false,
			name: '5 接口隔离原则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<ul>
					<li>客户端不应该依赖它不需要的接口</li>
					<li>一个类对另一个类的依赖应该建立在最小的接口上</li>
				</ul>
			`)
		},
		{
			active: false,
			name: '6 迪米特法则',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<ul>
					<li>一个对象应该对其他对象保持最少的了解</li>
					<li>类与类之间的关系越密切，耦合度越大</li>
				</ul>
			`)
		}
	]

	constructor(
		public sanitizer: DomSanitizer
	) { }

	ngOnInit() {
	}

}
