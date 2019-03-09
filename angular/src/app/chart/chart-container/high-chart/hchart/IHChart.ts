// api 地址：https://api.hcharts.cn/#xAxis.title.align
// tslint:disable-next-line:class-name
export interface series {
    // 系列的名称
    name: String;
    // 区域系列 如果未指定type选项，则它继承自chart.type
    type: string;
    // 系列的数据点数组
    //      data: [0, 5, 3, 5]
    //      data: [[0, 5], [5, 3]]
    //      data: [{x: 0, y: 5, name: 'aa', color: '#00FF00'}]
    data: Array<any>;
    // 颜色选择
    colorIndex: number;
}
// 初始化
export interface HInit {
    // 图表区和图形区的参数及一般图表通用参数
    chart: {
        // 图表渲染容器的 HTML 元素的 id 或对象引用
        // 当使用构造函数 Highcharts.chart 时，renderTo将作为第一个参数传递，所以在配置中不需要再配置该参数
        renderTo: String | Object;
        // 图表的默认类型。 可以是 plotOptions 下列出的任何图表类型。 默认是：line
        type: String;
    };
    // 颜色集合
    colors: Array<string>;
    // X 轴
    // 通过设置chart.inverted = true 可以让x，y轴显示位置对调
    xAxis: {
        // 标题
        title: {
            // 坐标轴对齐方式（相对于坐标轴的值），可用的值有 "low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐
            align: String;
            // 轴标题的文字。可以包含于文字相关的 HTML 标签
            text: String;
        }
        // 分类坐标轴中的分类
        categories: Array<String>;
        // 坐标轴类型
        //  "linear", "logarithmic", "datetime" 或者 "category"，分别表示 “线性轴”、“对数轴”、“时间轴”、“分类轴”
        type: String;
        // 坐标轴标签，即在刻度位置显示对应的数值、名字或格式化后的内容
        labels: {
            // 坐标轴标签格式化回调函数
            //  值可以通过 this 来获取
            formatter: Function
        }
    }
    // Y 轴
    yAxis: {
        // 标题
        title: {
            // 坐标轴对齐方式（相对于坐标轴的值），可用的值有 "low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐
            align: String;
            // 轴标题的文字。可以包含于文字相关的 HTML 标签
            text: String;
        }
    }
    // 数据列
    series: Array<series>;
    // 数据列配置是针对所有数据列及某种数据列有效的通用配置
    // 数据列的配置有三个级别：
    //      配置在 plotOptions.series，针对所有图表类型有效
    //      配置在 plotOptions.<数据列类型>，针对某种数据列有效
    //      配置在 series，针对某个数据列有效
    plotOptions: {
        // 面积图
        area: Object;
        // 面积范围图
        arearange: Object;
        // 面积曲线图
        areaspline: Object;
        // 面积曲线范围图
        areasplinerange: Object;
        // 条形图
        bar: Object;
        // 箱线图
        boxplot: Object;
        // 气泡图
        bubble: Object;
        // 柱状图
        column: Object;
        // 柱状范围图
        columnrange: Object;
        // 误差线图
        errorbar: Object;
        // 漏斗图
        funnel: Object;
        // 仪表图
        gauge: Object;
        // 热力图
        heatmap: Object;
        // 直线图
        line: Object;
        // 饼图
        pie: Object;
        // 多边形图
        polygon: Object;
        // 金字塔图
        pyramid: Object;
        // 散点图
        scatter: Object;
        // 通用数据列
        series: Object;
        // 仪表盘
        solidgauge: Object;
        // 曲线图
        spline: Object;
        // 树状图
        treemap: Object;
        // 瀑布图
        waterfall: Object;
    }
}

// tslint:disable-next-line:class-name
export const HCHART_OPTIONS = {
    default: {
        chart: {
            backgroundColor: null
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Chart',
            style: {
                color: 'transparent'
            }
        },
        legend: {
            enabled: true
        },
        credits: {
            enabled: false
        },
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S',
            shared: true
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: null,
                align: 'high',
                x: 0,
                y: 0
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: null,
                align: 'high',
                rotation: 0,
                offset: 0,
                y: -20
            }
        },
        plotOptions: {
            series: {
                lineWidth: 1,
                marker: {
                    radius: 2
                }
            },
            line: {
                pointStart: 0,
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: <b>{point.y}</b>'
                },
                showInLegend: true,
                slicedOffset: 5,
                startAngle: 45
            }
        }
    },
    column: {
        chart: {
            type: 'column',
        }
    },
    pie: {
        chart: {
            type: 'pie'
        },
        legend: {
            enabled: true,
            labelFormat: '{name}: <b>{percentage:.1f}%</b>'
        }
    },
    area: {
        chart: {
            type: 'area'
        }
    },
    circle: {
        chart: {
            type: 'circle'
        }
    },
    line: {
        chart: {
            type: 'line'
        }
    },
    spider: {
        chart: {
            type: 'spider'
        }
    },
    sunburst: {
        chart: {
        }
    }
}
