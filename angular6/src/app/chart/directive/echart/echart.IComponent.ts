// 初始化
export interface EInit {
    // 容器
    dom?: HTMLDivElement|HTMLCanvasElement,
    // 主题
    theme?: Object|string,
    opts?: {
        // 设备像素比，默认取浏览器的值window.devicePixelRatio
        devicePixelRatio?: number,
        // 渲染器，支持 'canvas' 或者 'svg'
        renderer?: string,
        // 可显式指定实例宽度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的宽度
        width?: number|string,
        // 可显式指定实例高度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的高度
        height?: number|string
    }
}

export interface EChartsObj {}

export interface EChartOption {
    // 初始化
    init: EInit,
    // 联动
    connect: string|Array<any>,
    // 解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 group 设为空
    disconnect: string,
    // 销毁实例，实例销毁后无法再被使用
    dispose: EChartsObj|HTMLDivElement|HTMLCanvasElement,
    // 获取 dom 容器上的实例
    getInstanceByDom: HTMLDivElement|HTMLCanvasElement,
    // 注册可用的地图，必须在包括 geo 组件或者 map 图表类型的时候才能使用
    registerMap: {
        // 地图名称，在 geo 组件或者 map 图表类型中设置的 map 对应的就是该值
        mapName: string,
        // GeoJson 格式的数据
        geoJson: any,
        // 可选。将地图中的部分区域缩放到合适的位置，可以使得整个地图的显示更加好看
        specialAreas: any
    }
    // 获取已注册的地图，返回的对象类型
    getMap: string,
    // 图形相关帮助方法
    graphic: any,
    // 设置图表展示数据
    setOption: any
}

// // registerMap demo
// echarts.registerMap('USA', usaJson, {
//     // 把阿拉斯加移到美国主大陆左下方
//     Alaska: {
//         // 左上角经度
//         left: -131,
//         // 左上角纬度
//         top: 25,
//         // 经度横跨的范围
//         width: 15
//     },
//     // 夏威夷
//     Hawaii: {
//         left: -110,
//         top: 28,
//         width: 5
//     },
//     // 波多黎各
//     'Puerto Rico': {
//         left: -76,
//         top: 26,
//         width: 2
//     }
// });

// // 联动demo
// // 分别设置每个实例的 group id
// chart1.group = 'group1';
// chart2.group = 'group1';
// echarts.connect('group1');
// // 或者可以直接传入需要联动的实例数组
// echarts.connect([chart1, chart2]);