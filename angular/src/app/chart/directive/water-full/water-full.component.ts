import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-water-full',
    templateUrl: './water-full.component.html',
    styleUrls: ['./water-full.component.scss']
})
export class WaterFullComponent implements OnInit {

    constructor() { }

    @Input()
    imgData: Array<string>;

    gap = 10;

    getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }

    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    box;
    items: any;

    // 封装成一个函数
    waterFall() {
        if (!this.items[0]) {
            return false;
        }
        // 1- 确定列数  = 页面的宽度 / 图片的宽度
        let pageWidth = this.getClient().width;
        let itemWidth = this.items[0].offsetWidth;
        let pageItem = pageWidth / +(+itemWidth + +this.gap) + '';
        let columns = parseInt(pageItem);
        let arr = [];
        for (let i = 0; i < this.items.length; i++) {
            if (i < columns) {
                // 2- 确定第一行
                this.items[i].style.top = 0;
                this.items[i].style.left = (itemWidth + this.gap) * i + 'px';
                arr.push(this.items[i].offsetHeight);

            } else {
                // 其他行
                // 3- 找到数组中最小高度  和 它的索引
                let minHeight = arr[0];
                let index = 0;
                for (let j = 0; j < arr.length; j++) {
                    if (minHeight > arr[j]) {
                        minHeight = arr[j];
                        index = j;
                    }
                }
                // 4- 设置下一行的第一个盒子位置
                // top值就是最小列的高度 + gap
                this.items[i].style.top = arr[index] + this.gap + 'px';
                // left值就是最小列距离左边的距离
                this.items[i].style.left = this.items[index].offsetLeft + 'px';

                // 5- 修改最小列的高度 
                // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                arr[index] = arr[index] + this.items[i].offsetHeight + this.gap;
            }
        }
        let lastItem = this.items[this.items.length - 1];
        this.box.style.height = parseInt(lastItem.style.top) + lastItem.offsetHeight + 'px';
    }
    ngOnInit() {
    }

    ngAfterViewInit() {

        // let self = this;
        // window.onload = function () {
        //     // 一进来就调用一次
        //     self.waterFall();
        // }

        // window.onresize = function () {
        //     self.waterFall();
        // };

        this.box = document.getElementById('box');
        this.items = this.box.children;
        setTimeout(() => {
            this.waterFall();
        })
    }
}
