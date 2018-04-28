import { Component, HostListener, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { UserLoginService } from './user/user-login/user-login.service';
import { UserRegisterService } from './user/user-register/user-register.service';
import { User } from './user/model/user-model';
import 'rxjs/add/operator/merge';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public currentUser: User;
	private globalClickCallbackFn: Function;
	private loginSuccessCallbackFn: Function;

	constructor(
		public elementRef: ElementRef,
		public renderer: Renderer,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public translate: TranslateService,
		public userLoginService: UserLoginService,
		public userRegisterService: UserRegisterService,
		public toastr: ToastsManager,
		public vcr: ViewContainerRef
	) {
		this.toastr.setRootViewContainerRef(vcr);
		console.log("什么也没有...");
	}

	ngOnInit() {
		this.globalClickCallbackFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {
			console.log("全局监听点击事件>" + event);
		});

		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

		this.userLoginService.currentUser
			.merge(this.userRegisterService.currentUser)
			.subscribe(
			data => {
				this.currentUser = data;
				let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
				let routerState: RouterState = this.router.routerState;
				let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

				console.log(activatedRouteSnapshot);
				console.log(routerState);
				console.log(routerStateSnapshot);

				//如果是从/login这个URL进行的登录，跳转到首页，否则什么都不做
				if (routerStateSnapshot.url.indexOf("/login") != -1) {
					this.router.navigateByUrl("/home");
				}
			},
			error => console.error(error)
			);

		this.translate.addLangs(["zh", "en"]);
		this.translate.setDefaultLang('zh');

		const browserLang = this.translate.getBrowserLang();
		console.log("检测到的浏览器语言>" + browserLang);
		this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
	}

	ngOnDestroy() {
		if (this.globalClickCallbackFn) {
			this.globalClickCallbackFn();
		}
	}

	toggle(button: any) {
		console.log(button);
	}

	public doLogout(): void {
		this.userLoginService.logout();
		this.toastr.success('退出成功！','系统提示');
		this.router.navigateByUrl("");
	}
}

/**
	 * JavaScript 的类型分为两种
	 * 		原始数据类型
	 *		对象类型
	 */
	// 原始数据类型包括:	布尔值、数值、字符串、null、undefined、Symbol


	/* 布尔值 */
	// 布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型
	let isDone: boolean = false;
	console.log(isDone+'布尔值');
	// 注意，使用构造函数 Boolean 创造的对象不是布尔值
	// let createByNewBooleanboolean: boolean = new Boolean(1);
	// 1.originalObject.ts(16,5): error TS2322: Type 'Boolean' is not assignable to typ
	// e 'boolean'.
	// console.log(createByNewBooleanboolean);
	// 事实上 new Boolean() 返回的是一个 Boolean 对象
	// let createByNewBooleanBoolean: Boolean = new Boolean(1);
	// console.log(createByNewBooleanBoolean);


	/* 数值 */
	let decLiteral: number = 6;
	console.log(decLiteral+'---数值');

	/* 字符串 */
	let stringName: string = "testStringName";
	console.log(stringName + '---字符串');

	/* 空值 */
	// 在 TypeScirpt 中，可以用 void 表示没有任何返回值的函数
	function alertName(): void {
		alert('alert-name');
	}
	// alertName();
	// 声明一个 void 类型的变量只能将它赋值为 undefined 和 null
	let unusable: void = undefined;
	console.log(unusable + '---undefined');

	/* Null 和 Undefined */
	let u: undefined = undefined;
	let n: null = null;
	console.log(u + '---undefined');
	console.log(n + '---null');

	/* 任意值（Any）用来表示允许赋值为任意类型 */
	let anyThing: any = 'Xcat Liu';
	// Uncaught TypeError: anyThing.setName is not a function
	// anyThing.setName('Jerry Lee');
	// anyThing.setName('Jerry Lee').sayHello();
	// anyThing.myName.setFirstName('Cat');
	// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

	/* 未声明类型的变量 */
	let something;
    something = 'seven';
	something = 7;

	// something.setName('Jerry Lee');
	// 等价于
	// let something: any;
	// something = 'seven';
	// something = 7;

	// something.setName('Jerry Lee');


	/**
	 * 类型推论
	 */
	let myFavoriteNumber = 'seven';
    // myFavoriteNumber = 7;
    //Type '7' is not assignable to type 'string'.
    // console.log(myFavoriteNumber);
    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    /*
    * 注意: 在TypeScript 2.1 之前，如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
    * */
    //TypeScript 2.1 中，编译器会考虑对 myFavoriteNumber 的最后一次赋值来检查类型


    /*
    * 联合类型
    * 联合类型（Union Types）表示取值可以为多种类型中的一种
    * */

    let myFavoriteNumber1: string | number;
    myFavoriteNumber1 = 'seven';
    myFavoriteNumber1 = 7;
    // myFavoriteNumber1 = true;
    //Type 'boolean' is not assignable to type 'number'.

    /*
    * 联合类型使用 | 分隔每个类型
    * */
    //这里的 string | number 的含义是，允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型


    /*
    * 访问联合类型的属性或方法
    * */
    //只能访问此联合类型的所有类型里共有的属性或方法

    // function getLength(something: string | number): number {
        // return something.length;
        //Property 'length' does not exist on type 'string | number'.
    // }

    //访问 string 和 number 的共有属性是没问题的

    function getString(something: string | number): string {
        //Identifier expected.
        return something.toString();
    }

    let myFavoriteNumber2: string | number;
    myFavoriteNumber2 = 'seven';
    console.log(myFavoriteNumber2);
    // console.log(myFavoriteNumber2.length);
    myFavoriteNumber2 = 7;
    console.log(myFavoriteNumber2);
    // console.log(myFavoriteNumber2.length);
    //Property 'length' does not exist on type 'number'.


    /*
    * 对象的类型——接口
    * 在 TypeScript 中，使用接口（Interfaces）来定义对象的类型
    * 赋值的时候，变量的形状必须和接口的形状保持一致
    * */

    interface Person {
        name: string;
        age: number
    }

    let per: Person = {
        name: 'person',
        age: 23
    }

    console.log(per);
    // 大小写也不能相同 类型是 Person
    //{name: "person", age: 23}

    /*
    * 可选属性
    * 可选属性的含义是该属性可以不存在
    * 仍然不允许添加未定义的属性
    * */
    interface Person1 {
        name: string;
        age?: number
    }

    let pre1: Person1 = {
        name: 'pre1',
        // age: 23
    }

    /*
    * 任意属性
    * 允许添加未定义的属性
    * */
    // interface Preson2 {
    //     name: string,
    //     age: number,
    //     [propName: string]: string
    // }
    //Property 'age' of type 'number' is not assignable to string index type 'string'.

    // let pre2: Preson2 = {
        // name: 'pre2',
        // age: 23,
        // website: 'website'
    // }
    //Property 'age' of type 'number' is not assignable to string index type 'string'.
    /*
    * 错误分析
    * 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了
    * { [x: string]: string | number; name: string; age: number; website: string; }
    * 联合类型和接口的结合
    * */


    /*
    * 只读属性
    * 希望对象中的一些字段只能在创建的时候被赋值
    * 用 readonly 定义只读属性
    * 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
    * */

    interface Person3 {
        readonly id: number,
        name: string,
        age?: number,
        [propName: string]: any
    }

    let per3: Person3 = {
        id: 123,
        name: 'per3',
        age: 23,
        email: 'null'
    }

    console.log(per3);

    // per3.id = 12;
    // Cannot assign to 'id' because it is a constant or a read-only property.


    /*
    * 数组的类型
    * 「类型 + 方括号」
    *  数组泛型 Array<elemType>
    *  用接口表示数组
    *  类数组——属于内置对象
    * */

    // 「类型 + 方括号」
    let fibonacci1: number[] = [1, 2, 3, 4];
    console.log('「类型 + 方括号」' + fibonacci1);
    // fibonacci1.push('1');
    //Argument of type '"1"' is not assignable to parameter of type 'number'.
    // let fibonacci2: number[] = [1, '1', 2];
    //Type '(string | number)[]' is not assignable to type 'number[]'.


    //数组泛型    Array<elemType>
    let fibonacci3: Array<number> = [1, 2, 3];
    // fibonacci3.push('1');
    //Argument of type '"1"' is not assignable to parameter of type 'number'.
    console.log(`Array<elemType>` + fibonacci3);


    //用接口表示数组
    interface Fibonacci {
        [index: number]: number
    }
    //只要 index 的类型是 number，那么值的类型必须是 number

    let fibonacci4: Fibonacci = [1, 2, 3, 4];
    console.log("[index: number]: number st");
    console.log(fibonacci4);
    console.log("[index: number]: number ed");

    interface fibonacciArr {
        [index: number]: any
    }

    let fibonacci5: fibonacciArr = [1, '2', true, {a: 'a'}];
    console.log("[index: number]: any st");
    console.log(fibonacci5);
    console.log("[index: number]: any ed");



    /*
    * 函数的类型
    * 函数声明（Function Declaration）
    * 函数表达式（Function Expression）
    * */

    //函数声明
    function sum(x, y) {
        return x+y;
    }
    //函数表达式
    let mySum = function(x, y) {
        return x+y;
    }

    //ts中的实例
    function sum1(x: number, y: number): number {
        return x+y;
    }
    //注意，输入多余的（或者少于要求的）参数，是不被允许的
    // sum1(1, 2, 3);
    // sum1(1);
    //Supplied parameters do not match any signature of call target
    console.log(sum1(1, 2));

    let mySum1 = function(x: number, y: number): number {
        return x+y;
    }

    //通过赋值操作进行类型推论而推断出来的——等价于
    // let mySum1: (x: number, y: number) => number = function(x: number, y: number): number {
    //     return x+y;
    // }

    /*
    * =>在函数中的使用
    * 在 TypeScript 的类型定义中，=> 用来表示函数的定义
    * 左边是输入类型，需要用括号括起来，右边是输出类型
    * */

    /*
    * 接口中函数的定义
    * */

    interface SearchFunc {
        // 左边是输入类型，需要用括号括起来，右边是输出类型；用冒号分开
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        return source.search(subString) !== -1
    }

    /*
    *函数——可选参数
    *可选参数后面不允许再出现必须参数
    * */

    function buildName(firstName: string, lastName?: string) {
        if(lastName) {
            return firstName + '   ' + lastName;
        } else {
            return firstName;
        }
    }
    let xcatliu = buildName('as', 'd');
    console.log(xcatliu);
    let xcar = buildName('as');
    console.log(xcar);

    /*
    * 函数——参数默认值
    * 添加了默认值的参数识别为可选参数
    * 注意此时的默认值就是可选参数并且不会像上面的后面必须传参
    * */

    function buildName1(firstName: string = 'default', lastName: string = 'liu') {
        return firstName + '   ' + lastName
    }

    let as1 = buildName1('aa', 'bb');
    console.log(as1);
    let asd1 = buildName1('aa');
    console.log(asd1);
    let asd2 = buildName1(undefined, undefined);
    console.log(asd2);

    /*
    * 函数——剩余参数（就是多个参数）
    * 默认的匿名数组处理方式
    * */
    function push(array, ...items) {
        items.forEach(function(item) {
            array.push(item);
        })
    }

    let usPush = [];
    push(usPush, 1, 2, 3, 4, 'asd', true);
    console.log(usPush);
    //[1, 2, 3, 4, "asd", true]
    //items 是一个数组。所以可以用数组的类型来定义它

    // function truePush(array: any[], ...items: any[]) {
    //     items.forEach(function(item) {
    //         array.push(item);
    //     })
    // }


    /*
    * 重载
    * 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
    * */

    function reverse(x: number | string): number | string {
        if(typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        }else if(typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }

    // 优化
    // function reverse(x: number): number;
    // function reverse(x: string): string;
    // function reverse(x: number | string): number | string {
    //     if(typeof x === 'number') {
    //         return Number(x.toString().split('').reverse().join(''));
    //     }else if(typeof x === 'string') {
    //         return x.split('').reverse().join('');
    //     }
    // }
    //重复定义了多次函数 reverse，前几次都是函数定义
    //最后一次是函数实现

    /*
    * 类型断言
    * 可以用来绕过编译器的类型推断
    * */

    //function getLength(something: string | number): number {
    //    return something.length;
    //}

    //    D:/newstudyofsuiyi/angular2Study/src/app/app.component.ts (413,26): Property 'length' does not exist on type 'string | number'.
    //Property 'length' does not exist on type 'number'.

    function getLength(spmething: string | number): number {
        if((<string>something).length) {
            return (<string>something).length;
        } else {
            return something.toString().length;
        }
    }
    console.log('————类型断言————');
    console.log(getLength(121));
    //1
    console.log(getLength('121'));
    //1

    /*
    * 声明文件
    * 当使用第三方库的时候，需要引用声明文件
    * */

    //$('.foo');
    //newstudyofsuiyi/angular2Study/src/app/app.component.ts (437,5): Cannot find name '$'.

    // 需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型
    //declare var $: (string) => any;
    //$('.foo');
    //Uncaught ReferenceError: $ is not defined


    //declare var jQuery: (string) => any;
    //jQuery('.foo');

    /*
    * 类型别名
    * 类型别名用来给一个类型起个新名字类型别名用来给一个类型起个新名字类型别名用来给一个类型起个新名字
    * */
