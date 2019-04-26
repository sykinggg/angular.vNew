import { Injectable } from '@angular/core';
import { ConvnetService, CarService } from '../index';

@Injectable({
    providedIn: 'root'
})
export class AiIndexService {

    public convnetjs: any;

    // 神经网络
    public layer_defs = [];
    public carList = [];

    // 初始化神经网路
    public net: any;

    // 初始化训练机制
    public trainer: any;

    // 声明图片
    public imageList: any;
    public disabled: any;

    constructor(
        public convnetService: ConvnetService,
        public carService: CarService,
    ) {

        let self = this;
        this.carList = this.carService.carList;
        // 神经网络
        this.convnetjs = this.convnetService.defaultConvent();

        // 输入层：即是100*100*3的图像
        this.layer_defs.push({ type: 'input', out_sx: 100, out_sy: 100, out_depth: 3 });
        // 卷积层 
        // filter：用16个5*5的滤波器去卷积
        // stride：卷积步长为1
        // padding：填充宽度为2（为保证输出的图像大小不会发生变化）
        // activation：激活函数为relu（还有Tanh、Sigmoid等等函数，功能不同）
        this.layer_defs.push({ type: 'conv', sx: 5, filters: 16, stride: 1, pad: 2, activation: 'relu' });
        // 池化层
        // 池化滤波器的大小为2*2
        // stride：步长为2
        // 在这里我们无法看出这个框架池化是使用的Avy Pooling还是Max Pooling算法，先视为后者
        this.layer_defs.push({ type: 'pool', sx: 2, stride: 2 });
        // 反复卷积和池化减小模型误差
        this.layer_defs.push({ type: 'conv', sx: 5, filters: 20, stride: 1, pad: 2, activation: 'relu' });
        this.layer_defs.push({ type: 'pool', sx: 2, stride: 2 });
        this.layer_defs.push({ type: 'conv', sx: 5, filters: 20, stride: 1, pad: 2, activation: 'relu' });
        this.layer_defs.push({ type: 'pool', sx: 2, stride: 2 });
        // 分类器：输出10中不同的类别
        this.layer_defs.push({ type: 'softmax', num_classes: 10 });

        // 初始化神经网路
        this.net = new this.convnetjs.Net();
        this.net.makeLayers(this.layer_defs);

        // 初始化训练机制
        this.trainer = new this.convnetjs.SGDTrainer(this.net, { learning_rate: 0.01, momentum: 0.9, batch_size: 5, l2_decay: 0.0 });
        this.imageList = [];
        const loadData = i => {
            return function () {
                return new Promise(function (resolve, reject) {
                    let image = new Image();
                    image.crossOrigin = "anonymous";
                    image.src = self['carList'][i].url;
                    image.onload = function () {
                        let vol = self['convnetjs'].img_to_vol(image);
                        self['trainer'].train(vol, i);
                        resolve();
                    };
                    image.onerror = reject;
                })
            }
        }
        for (let j = 0; j < self['carList'].length; j++) {
            self.imageList.push(loadData(j));
        }
    }

    public training() {
        Promise.all(this.imageList.map(imageContainer => imageContainer())).then((res: any) => {
            console.log("模型训练好了！！！👌")
            this.disabled = true;
            // 告诉机器每一类对应的是什么（即让机器认识图片的过程）
            const carNameList = ["奥迪", "奔驰", "宝马", "本田", "别克", "比亚迪", "保时捷", "大众", "哈弗"];
            const x = this.convnetjs.img_to_vol(document.getElementById('some_image'));
            // console.log(net.forward(x));
            const result = Array.from(this.net.forward(x).w);
            let max = Math.max.apply(Math, result);
            console.log("最有可能的那个汽车logo🚗", carNameList[result.indexOf(max)])
            console.log("接着训练！！！💪")
            this.training()
        })
    }


}
