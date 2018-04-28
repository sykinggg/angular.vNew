import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

//  Observable.of方法加载
import 'rxjs/add/observable/of';
//  Observable.from方法加载
import 'rxjs/add/observable/from';
//  Observable.zip方法加载
import 'rxjs/add/observable/zip';
//  Observable.fromEvent方法加载
import 'rxjs/add/observable/fromEvent';
//  Observable.combineLatest方法加载
import 'rxjs/add/observable/combineLatest';
//  Observable.interval方法加载
import 'rxjs/add/observable/interval';
//  Observable.fromEventPattern方法加载
import 'rxjs/add/observable/fromEventPattern';
//  Observable.defer 方法加载
import 'rxjs/add/observable/defer';

//  Observable pluck方法
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {observable} from "rxjs/symbol/observable";

@Component({
    selector: 'app-subscriber',
    templateUrl: './subscriber.component.html',
    styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {
    /**
     * demo1 (使用Observable.of创建对象)
     * */
    sourceData1 = [];
    source1 = Observable.of(1, 2, 3, 4, 5);
    observer1 = {
        next: x => {
            console.log('Observer got a next value: ' + x);
            this.sourceData1.push(x);
        },
        error: err => {
            console.error('Observer got an error: ' + err);
            this.sourceData1.push(err);
        },
        complete: () => {
            console.log('Observer got a complete notification');
            this.sourceData1.push('complete');
        },
    };
    subscribe1 = () => {
        this.source1.subscribe(this.observer1);
    };
    //  demo1 结束
    
    /**
     * demo2 (使用Observable对象实例化对象并使用时间进行订阅)
     * */
    sourceData2 = [];
    source2 = (observer) => {
        setTimeout(observer.next(1), 1000);
        
        setTimeout(observer.next(2), 2000);
        
        setTimeout(observer.next(3), 3000);
        observer.complete();
    
        return {unsubscribe() {}};
    };
    
    sequence = new Observable(this.source2);
    
    subscribe2 = () => {
        this.sequence.subscribe({
            next: (num) => {
                console.log(num);
                this.sourceData2.push(num);
            },
            complete: () => {
                console.log('Finished sequence');
                this.sourceData2.push('finished');
            }
        });
    };
    //  demo2 结束
    
    /**
     * demo 3 (纯响应式编程)
     * */
    subscribe3 = () => {
        let b = Observable.from([1, 3]);
        let c = Observable.from([2, 2]);
    
        let a = Observable.zip(b, c, (b, c) => {
            console.log('b: ' + b);
            console.log('c: ' + c);
            return b + c
        });
    
        a.subscribe(a => {
            console.log('a: ' + a);
        })
    };
    //  demo3 结束
    
    /**
     * demo 4 传统事件绑定
     * */
    demo4Data: any;
    subscribe4 = () => {
        let demo4Event = document.getElementById('demo4');
        let input$ = Observable.fromEvent(demo4Event, 'keyup');
        input$
        //  进行过滤判断keycode的值
        .filter((input: any) => input.keyCode === 32)
        //  使用map进行对象到值的过滤
        .map(input => input.target.value)
        //  进行订阅
        .subscribe((value: any) => {
            this.demo4Data = value;
        })
    };
    //  demo4 结束
    
    /**
     * demo 5 常见操作(pluck)
     * */
    demo5Data: any;
    subscribe5 = () => {
        let demo5Event = document.getElementById('demo5');
        let input$ = Observable.fromEvent(demo5Event, 'change');
        input$
        .pluck('target', 'value')
        .subscribe(value => {
            console.log(value);
            this.demo5Data = value;
        })
    };
    //  demo5 结束
    
    /**
     * demo 6 合并类操作符(combineLatest)
     * */
    demo6Data: any;
    subscribe6 = () => {
        let demo6Input = document.getElementById('demo6Input');
        let demo6Button = document.getElementById('demo6Button');
        
        let input$ = Observable.fromEvent(demo6Input, 'change');
        let button$ = Observable.fromEvent(demo6Button, 'click');
        
        //  从前往后按顺序的参数是Observable的组件
        Observable.combineLatest(button$, input$, (ev, input) => {
            return {
                ev: ev,
                input: input
            }
        })
        .subscribe(value => {console.log(value)});
    };
    //  demo6 结束
    
    /**
     * demo 7 合并类操作符(combineLatest使用)
     * */
    demo7Data: any;
    subscribe7 = () => {
        let weight = document.getElementById('demo7Weight');
        let height = document.getElementById('demo7Height');
        let bmi = document.getElementById('demo7bmi');
        
        let weight$ = Observable
            .fromEvent(weight, 'input')
            .pluck('target', 'value');
        
        let height$ = Observable
            .fromEvent(height, 'input')
            .pluck('target', 'value');
        
        let bmi$ = Observable
            .combineLatest(weight$, height$, (w: any, h: any) => {
                console.log('w' + w);
                console.log('h' + h);
                return w / ( h * h / 100 / 100 );
            });
        
        bmi$.subscribe(b => {
            this.demo7Data = b;
        })
    };
    //  demo7 结束
    
    /**
     * demo 8 合并类操作符(zip)
     * */
    subscribe8 = () => {
        let greetings = ['Hello', 'How are you', 'How are you doing'];
        let time = 3000;
        let item$ = Observable.from(greetings);
        let interval$ = Observable.interval(time);
        
        Observable.zip(item$, interval$, (item, index) => {
            return {
                item: item,
                index: index
            }
        })
        .subscribe(result => {
            console.log('item: ' + result.item );
            console.log('index: ' + result.index );
            console.log('at: ' + new Date() );
        })
    };
    //  demo8 结束
    
    /**
     * demo 9 创建类操作符
     * */
    subscribe9 = () => {
        
        //  Observable.from
        let array = [10, 20, 30];
        let result$ = Observable.from(array);
        result$.subscribe(x => {
            console.log(x);
        });
        
        //  Observable.fromEvent
        let click$ = Observable.fromEvent(document, 'click');
        click$.subscribe(x => {
            console.log(x);
        });
        
        //  Observable.fromEventPattern
        function addClickHandler(handler) {
            document.addEventListener('click', handler);
        }
    
        function removeClickHandler(handler) {
            document.removeEventListener('click', handler);
        }
        let setClick$ = Observable.fromEventPattern(
            addClickHandler,
            removeClickHandler
        );
        setClick$.subscribe(x => {
            console.log(x);
        })
    };
    //  demo9 结束
    
    /**
     * demo 10 defer操作符
     * */
    demo10Data: any;
    subscribe10 = () => {
        function doHeavyJob() {
            setTimeout(function() {console.log('doing something') }, 2000);
            return true;
        }
        
        Observable.defer(() => {
            let result = doHeavyJob();
            return result ? 'success' : 'failed';
        })
        .subscribe(x => {
            console.log(x)
        });
    };
    constructor() {
    }
  
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.subscribe4();
        this.subscribe6();
        this.subscribe7();
    }

}
