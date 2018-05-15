import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-decorator',
	templateUrl: './decorator.component.html',
	styleUrls: ['./decorator.component.scss']
})
export class DecoratorComponent implements OnInit {

	private componentSummary:Array<any> = [
		{
			active: false,
			name: '1.animations(用过)',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">组件的动画列表</p>
				<h6>详细描述:</h6>
				<ul class="f-c-999">
					<li>类似动画的DSL在组件上定义的</li>
					<li>动画通过监听模板内某个元素上发生的状态变化来工作</li>
					<li>通过编程DSL，动画不仅限于DOM特定的环境（Angular也可以在后台执行优化，使动画更加高效。）</li>
					<li>
						<p>要使动画可供使用，动画状态更改将放置在动画注释元数据内部的动画触发器中</p>
						<p class="f-c-999">在触发器内，可以放置状态和转换条目</p>
					</li>
				</ul>
				<pre>
	@Component(&#123;
		selector: 'animation-cmp',
		templateUrl: 'animation-cmp.html',
		animations: [
			// 动画触发器包含状态更改动画
			trigger('myTriggerName', [
				// 为'on'和'off'定义的样式，声明的状态是持久的
				state('on', style(&#123; opacity: 1 }),
				state('off', style(&#123; opacity: 0 }),
			
				// 当它开始时 这种状态改变跳转是真实的
				transition('on => off', [
					animate("1s")
				])
			])
		]
	})
				</pre>
				<h6>代码描述:</h6>
				<p class="f-c-999">一组相关的动画状态都包含在动画触发器中</p>
				<ul class="f-c-999">
					<li>当触发器被创建时，它可以通过由@符号前缀的属性绑定到组件模板中的一个元素上</li>
					<li>后跟一个触发器名称和一个用于确定该触发器的状态值的表达式</li>
				</ul>
				<pre>
	<!-- animation-cmp.html -->
	&#60;div @myTriggerName="expression">...&#60;/div>
				</pre>
				<h6>异步使用值的处理</h6>
				<p class="f-c-999">对于要执行的状态更改，表达式值必须将其现有值的值更改为我们设置动画进行动画处理的某个值</p>
				<h5>DSL动画功能(从animation中引申出来)</h5>
				<p class="f-c-999">共8中内置方法(@angular/animations)</p>
			`),
			child: [
				{
					active: false,
					name: '1.trigger()',
					content: this.sanitizer.bypassSecurityTrustHtml(`
						<p class="f-c-999">状态和转换声明组成的数组</p>
						<pre>
	使用
	触发器将根据提供的名称值创建动画触发器引用
	@Component(&#123;
		selector: 'component',
		templateUrl: 'component.tpl.html',
		animations: [
			trigger('animation1', [
				state(...),
				state(...),
				transition(...),
				transition(...)
			])
		]
	})
	class Component &#123;
		status = 'something';
	}

	somewhere inside of component.tpl.html
	&#60;div [@myAnimationTrigger]="status">...&#60;/div>
						</pre>
						<h6>是否禁用动画</h6>
						<p class="f-c-999">@ .disabled使用属性绑定来控制这个元素及其子元素的动画</p>
						<pre>
	如果@.disabled属性绑定的值为true则会阻止所有动画(该元素的以及该元素内的)
	@Component(&#123;
		selector: 'my-component',
		template: \`
			&#60;div [@.disabled]="isDisabled">
				&#60;div [@childAnimation]="exp">&#60;/div>
			&#60;/div>
		\`,
		animations: [
			trigger("childAnimation", [
				// ...
			])
		]
	})
	class MyComponent &#123;
		isDisabled = true;
		exp = '...';
	}
						</pre>
						<h6>组件中禁用动画</h6>
						<p class="f-c-999">
							主要是区分两个概念主要组件以及副组件,
							影响就是禁用动画的生效范围,
							主组件就是枝干可以被别的枝干引用就类似于树,
							生效范围就是依赖注入的生效的范围.
						</p>
						<pre>
	import &#123;Component, HostBinding} from '@angular/core';

	@Component(&#123;
		selector: 'app-component',
		templateUrl: 'app.component.html',
	})
	class AppComponent &#123;
		@HostBinding('@.disabled')
		public animationsDisabled = true;
	}
						</pre>
						<h6>动画查询</h6>
						<p class="f-c-999">禁用不是消失动画还在可以使用query()和animateChild()来查询使用</p>
						<h6>检测动画被禁用</h6>
						<p class="f-c-999">
							如某个区域禁用了其动画，
							则动画触发器回调仍然会像正常一样触发（仅适用于零秒）,
							当触发器回调触发时，它将提供一个AnimationEvent实例,
							如果动画被禁用，则事件的.disabled标志将为true
						</p>
					`)
				},
				{
					active: false,
					name: '2.state()',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">在给定的触发器中声明一个动画状态</p>
					<pre>
声明一个新的状态值
function state(name: string, styles: AnimationStyleMetadata, options?: &#123;
	params: &#123;
		[name: string]: any;
	};
}): AnimationStyleMetadata;
					</pre>
					<p class="f-c-999">默认状态显示</p>
					<ul>
						<li>
							<h6>void state</h6>
							<p class="f-c-999">void状态值是一个保留字，用于确定元素何时不再与应用程序分离</p>
							<p>当ngIf计算结果为false，则相关元素的状态为void时</p>
						</li>
						<li>
							<h6>*(default) state</h6>
							<p class="f-c-999">
								*状态（当样式化时）是一个后备状态，如果正在动画的状态未在触发器中声明，则将使用该状态
							</p>
						</li>
					</ul>
					<pre>
使用:
stateNameExpr可以是一个或多个以逗号分隔的状态名称

默认状态
state("void", style(&#123;height: 0}))

使用状态
state('closed', style(&#123;height: 0}))
state('open, visible', style(&#123;height: ''}))

style是指一旦达到状态就会在元素上保留的样式数据
import &#123;animate, state, style, transition, trigger} from '@angular/animations';
import &#123;Component, NgModule} from '@angular/core';
import &#123;BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component(&#123;
	selector: 'example-app',
	styles: [\`
		.toggle-container &#123;
		background-color:white;
		border:10px solid black;
		width:200px;
		text-align:center;
		line-height:100px;
		font-size:50px;
		box-sizing:border-box;
		overflow:hidden;
		}
	\`],
	animations: [trigger(
		'openClose',
		[
			state('collapsed, void', style(&#123;height: '0px', color: 'maroon', borderColor: 'maroon'})),
			state('expanded', style(&#123;height: '*', borderColor: 'green', color: 'green'})),
			transition(
				'collapsed < = > expanded', [animate(500, style(&#123;height: '250px'})), animate(500)])
		])],
	template: \`
		&#60;button (click)="expand()">Open&#60;/button>
		&#60;button (click)="collapse()">Closed&#60;/button>
		&#60;hr />
		&#60;div class="toggle-container" [@openClose]="stateExpression">
		Look at this box
		&#60;/div>
	\`
})
export class MyExpandoCmp &#123;
	stateExpression: string;
	constructor() &#123; this.collapse(); }
	expand() &#123; this.stateExpression = 'expanded'; }
	collapse() &#123; this.stateExpression = 'collapsed'; }
}

@NgModule(
    &#123;imports: [BrowserAnimationsModule], declarations: [MyExpandoCmp], bootstrap: [MyExpandoCmp]})
export class AppModule &#123;}
					</pre>
					`)
				},
				{
					active: false,
					name: '3.transition()',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">转换声明的动画步骤序列,根据当前的stateChangeExpr</p>
					<pre>
stateChangeExpr由state1 => state2组成，它由两个已知状态组成（使用asterix（*）来指代动态开始和/或结束状态）
function transition(stateChangeExpr: string | ((fromState: string, toState: string) => boolean), 
steps: AnimationMetadata | AnimationMetadata[], options: AnimationOptions | null = null): AnimationTransitionMetadata;

函数也可以作为transition的stateChangeExpr参数提供，并且每次发生状态更改时都会执行此函数

如果函数内返回的值为true，则将运行关联的动画

动画转换放置在动画触发器内

使用:
// 所有转换/状态更改都在动画触发器中定义
trigger("myAnimationTrigger", [
	// 如果一个状态被定义了，那么当它的样式将被保持
	// 动画已经完全自行完成
	state("on", style(&#123; background: "green" })),
	state("off", style(&#123; background: "grey" })),

	// 一个将在状态值时被启动的过渡动画
	// 状态值从on=>off
	transition("on => off", animate(500)),

	// 可以为两个方向运行相同的动画
	transition("on < = > off", animate(500)),

	// 或定义由逗号分隔的多个状态对
	transition("on => off, off => void", animate(500)),

	// 插入元素时的全部状态变化
	// 该页面和目标状态是未知的
	transition("void => *", [
		style(&#123; opacity: 0 }),
		animate(500)
	]),

	// 将捕获任何状态之间的状态变化
	transition("* => *", animate("1s 0s")),

	// 可以使用函数
	transition((fromState, toState) => &#123;
		// 当为真时,调用下面的动画
		return fromState == "off" && toState == "on";
	}, animate("1s 0s"))
])

与此组件关联的模板将通过绑定到其模板代码中的元素来使用myAnimationTrigger动画触发器
<!-- somewhere inside of my-component-tpl.html -->
&#60;div [@myAnimationTrigger]="myStatusExp">...&#60;/div>

默认优先执行的动画
transition("void => *", [
	style(&#123;opacity: 0}),
	animate(500)
])

:enter && :leave
transition(":enter", [
	style(&#123;opacity: 0}),
	animate(500, style(&#123;opacity: 1}))
]),
transition(":leave", [
	animate(500, style(&#123;opacity: 0}))
])
					</pre>
					`)
				},
				{
					active: false,
					name: '4.group()',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					
					`)
				},
				{
					active: false,
					name: '5.sequence()',
					content: this.sanitizer.bypassSecurityTrustHtml(``)
				},
				{
					active: false,
					name: '6.style()',
					content: this.sanitizer.bypassSecurityTrustHtml(``)
				},
				{
					active: false,
					name: '7.animate()',
					content: this.sanitizer.bypassSecurityTrustHtml(``)
				},
				{
					active: false,
					name: '8.keyframes()',
					content: this.sanitizer.bypassSecurityTrustHtml(``)
				}
			]
		},
		{
			active: false,
			name: "2.changeDetection",
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">更改此组件使用的检测策略</p>
				<h6>参数格式:ChangeDetectionStrategy</h6>
				<pre>
	概述
	enum ChangeDetectionStrategy &#123;
		OnPush: 0
		Default: 1
	}
				</pre>
				<ul>
					<li>OnPush</li>
					<p class="f-c-999">OnPush意味着变化检测器的模式将初始设置为CheckOnce(似乎是仅改变一次)</p>
				</ul>
				<ul >
					<li>Default</li>
					<p class="f-c-999">Default意味着更改检测器的模式将初始设置为CheckAlways(动态监测机制)</p>	
				</ul>
			`)
		},
		{
			active: false,
			name: '3.encapsulation',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">组件使用的风格封装策略</p>
			`)
		},
		{
			active: false,
			name: '4.entryComponents',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">动态插入到组件视图中的组件列表</p>
			`)
		},
		{
			active: false,
			name: '5.exportAs',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">在模板中将组件实例导出的名称</p>
			`)
		},
		{
			active: false,
			name: '6.host',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">将类属性映射到组件绑定事件，属性和属性的元素</p>
			`)
		},
		{
			active: false,
			name: '7.inputs',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">将类属性名称列表数据绑定为组件输入</p>
			`)
		},
		{
			active: false,
			name: '8.interpolation',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">用于组件模板的自定义插值标记</p>
			`)
		},
		{
			active: false,
			name: '9.moduleId',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">定义组件的文件的ES / CommonJS模块ID</p>
				<h6>具体描述:</h6>
				<p class="f-c-999">
					包含组件的模块的模块ID
					需要能够解析模板和样式的相关URL
					在CommonJS中，这可以始终设置为module.id，类似地，SystemJS在每个模块中公开__moduleName变量
				</p>
				<pre>
	@Directive(&#123;
		selector: 'someDir',
		moduleId: module.id
	})
	class SomeDir &#123;
	}
				</pre>
			`)
		},
		{
			active: false,
			name: '9.outputs',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">公开订阅的输出事件的类属性名称列表</p>
			`)
		},
		{
			active: false,
			name: '10.providers(用过)',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">组件及其子组件可用的提供程序列表</p>
			`)
		},
		{
			active: false,
			name: '11.queries',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">配置可注入组件的查询</p>	
			`)
		},
		{
			active: false,
			name: '12.selector(用过)',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">css选择器，用于在模板中标识此组件</p>
			`)
		},
		{
			active: false,
			name: '13.styleUrls(用过)',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">要应用于此组件视图的样式表的URL列表</p>
			`)
		},
		{
			active: false,
			name: '14.styles',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">内联定义的样式应用于此组件的视图</p>
			`)
		},
		{
			active: false,
			name: '15.template',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">内联定义的视图模板</p>
				<h6>详细描述:</h6>
				<p class="f-c-999">
					每个组件只能定义一个templateUrl或template
				</p>
			`)
		},
		{
			active: false,
			name: '16.templateUrl',
			content: this.sanitizer.bypassSecurityTrustHtml(`
				<p class="f-c-999">url到包含视图模板的外部文件</p>
				<h6>详细描述:</h6>
				<p class="f-c-999">
					每个组件只能定义一个templateUrl或template
				</p>
			`)
		},
		{
			active: false,
			name: '17.viewProviders',
			content: this.sanitizer.bypassSecurityTrustHtml(`
			<p class="f-c-999">组件及其视图子项可用的提供者列表</p>
			<h6>一个可以注入类的栗子</h6>
			<pre>
class Greeter &#123;
	greet(name:string) &#123;
		return 'Hello ' + name + '!';
	}
}

@Directive(&#123;
	selector: 'needs-greeter'
})
class NeedsGreeter &#123;
	greeter:Greeter;

	constructor(greeter:Greeter) &#123;
		this.greeter = greeter;
	}
}

@Component(&#123;
	selector: 'greet',
	viewProviders: [
		Greeter
	],
	template: \`&#60;needs-greeter>&#60;/needs-greeter>\`
})
class HelloWorld &#123;
}
			</pre>
			<h6>参数格式:Provider[]</h6>
			<p class="f-c-999">type Provider = TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[];</p>
			`),
			child: [
				{
					active: false,
					name: '1.TypeProvider',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">使用'Type'作为标记时，将Injector配置为返回Type的一个实例</p>
					<pre>
接口:
interface TypeProvider extends Type &#123;
	继承自核心/类型
	new (...args: any[]): T
}
使用:
@Injectable()
class MyService &#123;}

const provider: TypeProvider = MyService;

实栗:
@Injectable()
class Greeting &#123;
	salutation = 'Hello';
}

const injector = ReflectiveInjector.resolveAndCreate([
	Greeting,
])

export(injector.get(Greeting).salutation).toBe('Hello');
					</pre>
					`)
				},
				{
					active: false,
					name: '2.ValueProvider',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">配置Inject以返回token的值</p>
					<pre>
接口:
interface valueProvider exetends ValueSansProvider &#123;
	provide: any,
	multi?: boolean
}

provide: 
一个注射令牌(通常是Type或InjectionToken的实例)

nulti:
如果为true，那么注入器将返回一个实例数组
允许跨多个文件传播的多个提供程序将配置信息提供给一个通用token很有用
const locale = new InjectionToken < string[] > ('locale');

const injector = Injector.create([
	&#123;provide: locale, mluti: true, useValue: 'en'},
	&#123;provide: locale, mluti: true, useValue: 'sk'},
])

const locales: string[] = injector.get(locale);

export(locales).toEqual(['en', 'sk']);

使用:
const provider: ValueProvider = &#123; provide: 'someToken', useValue: 'someValue' }

DI:
const injector = Injector.create([&#123;provide: String, useValue: 'Hello'}]);

expect(injector.get(String)).toEqual('Hello');
					</pre>
					`)
				},
				{
					active: false,
					name: '3.ClassProvider',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">配置注入器以返回令牌的useClass实例</p>
					<pre>
接口:
interface ClassProvider extends ClassSansProvider &#123;
	provide: any,
	multi?: boolean
}

provide: 
一个注射令牌(通常是Type或InjectionToken的实例)

nulti:
如果为true，那么注入器将返回一个实例数组
允许跨多个文件传播的多个提供程序将配置信息提供给一个通用token很有用
const local = new InjectionToken < string[] > ('locale');

const injector = Injector.create([
	&#123;provide: locale, multi: true, useValue: 'en'},
	&#123;provide: locale, multi: true, useValue: 'sk'},
])

const locales: string[] = injector.get(locale);

expect(locales).toEqual(['en', 'sk']);

使用:
@Injectable()
class MyService &#123;}

const provider: ClassProvider = &#123;provide: 'someToken', useClass: MyService}

实栗:
abstract class Shape &#123; name: string; }

class Square extends Shape &#123;
	name = 'square';
}

const injector = ReflectiveInjector.resolveAndCreate([&#123;provide: Shape, useClass: Square}]);

const shape: Shape = injector.get(Shape);

差异性的ClassProvider
class Greeting &#123;
	salutation = 'hello';
}

class FormalGreeting extends Greeting &#123;
	salutation = 'Greeting';
}

const injector = ReflectiveInjector.resolveAndCreate(
	[
		FormalGreeting,
		&#123;provide: Greeting, useClass: FormalGreeting}
	]
)

注入器返回不同的实例
expect(injector.get(FormalGreeting)).not.toBe(injector.get(Greeting));
					</pre>
					`)
				},
				{
					active: false,
					name: '4.ExistingProvider',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">配置injector以返回另一个useExisting标记的值</p>
					<pre>
接口:
interface ExistingProvider extends ExistingSansProvider &#123;
	provide: any,
	multi?: boolean
}

provide: 
一个注射令牌(通常是Type或InjectionToken的实例)

nulti:
如果为true，那么注入器将返回一个实例数组
允许跨多个文件传播的多个提供程序将配置信息提供给一个通用token很有用
const local = new InjectionToken < string[] > ('locale');

const injector = Injector.create([
	&#123;provide: locale, multi: true, useValue: 'en'},
	&#123;provide: locale, multi: true, useValue: 'sk'},
])

const locales: string[] = injector.get(locale);

expect(locales).toEqual(['en', 'sk']);

使用:
const provider: ExistingProvider = &#123;
	provide: 'someToken', useExisting: 'someOtherToken'
}

实栗:
class Greeting &#123;
	salutation = 'hello'
}

class FormalGreeting extends Greeting &#123;
	salutation = "Greetings";
}

const injector = Injector.create([
	&#123;provide: FormalGreeting, deps: []},
	&#123;provide: Greeting, useExisting: }
])

expect(injector.get(Greeting).salutation).toEqual('Greetings');
expect(injector.get(FormalGreeting).salutation).toEqual('Greetings');
expect(injector.get(FormalGreeting)).toBe(injector.get(Greeting));
					</pre>
					`)
				},
				{
					active: false,
					name: '5.FactoryProvider',
					content: this.sanitizer.bypassSecurityTrustHtml(`
					<p class="f-c-999">通过调用useFactory函数来配置注入器以返回值</p>
					<pre>
接口:
interface FactoryProvider extends FactorySansProvider &#123;
	provide: any,
	multi?: boolean
}

provide: 
一个注射令牌(通常是Type或InjectionToken的实例)

nulti:
如果为true，那么注入器将返回一个实例数组
允许跨多个文件传播的多个提供程序将配置信息提供给一个通用token很有用

const locale = new InjectionToken < string[] > ('locale');
const injector = Injector.create([
  	&#123;provide: locale, multi: true, useValue: 'en'},
  	&#123;provide: locale, multi: true, useValue: 'sk'},
]);

const locales: string[] = injector.get(locale);
expect(locales).toEqual(['en', 'sk']);

使用:
function serviceFactory() &#123;}

const provider: FactoryProvider = &#123;provide: 'someToken', useFactory: serviceFactory, deps: []};

实栗:
const Location = new InjectionToken('location');
const Hash = new InjectionToken('hash');

const injector = Injector.create([
	&#123;
		provide: Location, 
		useValue: 'http://angular.io/#someLocation'
	},
	&#123;
		provide: Hash,
		useFactory: (location: string) => location.split('#')[1],
		deps: [Location]
	}
]);

expect(injector.get(Hash)).toEqual('someLocation');

加入依赖关系
const Location = new InjectionToken('location');
const Hash = new InjectionToken('hash');

const injector = Injector.create([&#123;
  provide: Hash,
  useFactory: (location: string) => \`Hash for: $&#123;location}\`,
  // use a nested array to define metadata for dependencies.
  deps: [[new Optional(), Location]]
}]);

expect(injector.get(Hash)).toEqual('Hash for: null');
					</pre>
					`)
				}
			]
		}
	]

	constructor(
		private sanitizer: DomSanitizer
	) { }

	ngOnInit() {
	}

}
