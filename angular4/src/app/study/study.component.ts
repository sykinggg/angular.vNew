import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-study',
    templateUrl: './study.component.html',
    styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

    routerLinkArr: Array<any> = [
        { router: '/study/router', name: '路由配置' },
        { router: '/study/dependencyInject', name: '依赖注入' },
        { router: '/study/templateDataBind', name: '模版|数据' },
        { router: '/study/LifecycleHooks', name: '生命周期' },
        { router: '/study/ComponentInteraction', name: '组件通讯' },
        { router: '/study/ComponentStyles', name: '组件样式' },
        { router: '/study/DynamicComponentLoader', name: '动态加载' },
        { router: '/study/AttributeDirectives', name: '属性组件' },
        { router: '/study/SructuralDectives', name: '结构指令' },
        { router: '/study/PipesComponent', name: '管道' },
        { router: '/study/AnimationsComponent', name: '动画' },
        { router: '/study/FormComponent', name: '总结' }
    ]

    constructor() { }

    ngOnInit() {
    }

}
