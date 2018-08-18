import { Injectable } from '@angular/core';
import { Render } from './render';
require('echarts-liquidfill');

@Injectable()

export class ChartLiquidFillService {
    constructor() {
    }

    public render(containerDom, option, scope, persist) {
        if (option == null) {
            containerDom.html("<div class=\"alert alert-danger\" role=\"alert\">No Data!</div>");
            return null;
        }
        let height;

        scope ? height = scope.myheight - 20 : null;

        return new Render(containerDom, option).chart(height, persist);
    };

    public parseOption(data) {
        var config = data.chartConfig;
        var maxValue = config.values[0].maxValue ? config.values[0].maxValue : 100;

        var animation = true;
        if (config.animation == 'static') {
            animation = false;
        }

        var style = config.values[0].style ? config.values[0].style : "circle";

        var datas = [];
        var value = data.data.length > 0 ? data.data[0][0] : 'N/A';
        if (value != 'N/A' && value < maxValue) {
            for (var i = 1; i < 5; i++) {
                var percent = 1;
                for (var j = 1; j < i; j++) {
                    percent = percent * 0.95;
                }
                datas.push(value * percent / maxValue);
            }
        }
        if(value != 'N/A' && value >= maxValue){
            for( var i = 0;i < 5;i ++){
                datas.push(1)
            }
        }

        var option: any = {
            series: [{
                type: 'liquidFill',
                shape: style,
                data: datas,
                waveAnimation: animation,
                radius: '70%',
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: '#156ACF'
                },
                outline: {
                    show: false
                }
            }],
            label:{
                textStyle: {
                    fontSize: 35,
                    fontFamily: 'Lobster Two',
                    color:"#000"
                }
            }
        };

        if(datas[0] == 1){
            option.label.normal = {
                formatter:"I'm full."
            }
        }
        return option;
    };
}