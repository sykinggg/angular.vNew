import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-js-summary-sum',
    templateUrl: './js-summary-sum.component.html',
    styleUrls: ['./js-summary-sum.component.scss']
})
export class JsSummarySumComponent implements OnInit {

    private jsAsyncSumUp = {
        callBack: `
        function f1(f2) {
            setTimeout(() => {
                console.log('先执行 f1');
            }, 1000);
            f2();
        }
        function f2() {
            console.log('再执行 f2')
        }`,
        eventWatch: `
        $(document).ready(() => {
            console.log('DOM 已经 ready')
        });
        `,
        subscribe: `
        // 订阅done事件
        $('#app').on('done', (data) => {
            console.log(data);
        });
        // 发布事件
        $('#app').trigger('done', 'haha');
        `,
        promise: `
        export default funcion getMethods(url) {
            return new Promise((resolve, reject) => {
                axios.get(url).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        }

        getMethods('/api/xxx').then(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
        `,
        generator: `
        function* generatorDemo() {
            yield 'hello';
            yield 1 + 2;
            return 'ok';
        }

        var demo = generatorDemo();

        demo.next(); // { value: 'hello', done: false }
        demo.next(); // { value: 3, done: false }
        demo.next(); // { value: 'ok', done: ture }
        demo.next(); // { value: undefined, done: ture }
        `,
        async: `
        async function demo() {
            try {
                await new Promise((resolve, reject) => {

                })
            } catch(err) {
                console.log(err);
            }
        }

        demo().then(data => {
            console.log(data);
        })
        `,
        complexJudgment: `
        ...
        if (state === 1) {
            sendLog('processing');
            jumpTo('IndexPage');
        }
        ...
            ||
        ...
        switch (state) {
            case 1:
                sendLog('processing');
                jumpTo('IndexPage');
                break;
        ...
            ||
        ...
        action = {
            1: ['processing', 'IndexPage']
        ...
            ||
        ...
        actions = new Map([
            [1: ['processing', 'IndexPage']]
        ])
        action = actions.get(state)
        ...
            ||
        ...
        actions = new Map([
            [1, () => {processing, IndexPage}]
        ])
        action = actions.get(state)
        ...
            ||
        ...
        actions = {
            1: () => {processing, IndexPage}
        }
        action = action[state]
        ...
            ||
        ...
        actions = new Map([
            [{indentity: '1', state: 1}, () => {processing, IndexPage}]
        ])
        ...
        `,
        asyncDemo: `
        <button onclick="updateSync()">同步</button>
        <button onclick="updateAsync()">异步</button>
        function updateSync() {
            for(let i = 0; i < 100000; i++) {
                document.getElementById('output).innerHTML = i;
            }
        }
        function updateAsync() {
            var i = 0;
            function updateLater() {
                document.getElementById('output).innerHTML = (i++);
                if(i < 100000) {
                    setTimeout(updateLater, 0);
                }
            }
            updateLater();
        }
        `
    }

    constructor() { }

    ngOnInit() {
    }

}
