import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { RouterNameService } from './service/router-name/router-name.service';

import { LocalStorage } from './common/local.storage';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [RouterNameService]
})
export class AppComponent implements OnInit, OnDestroy {

    acxtiveRouterName = '';

    footerContent = 'by Angular'

    routerUnsubscribe: Subscription;

    routerLinkArr: Array<any> = [
        { routerName: 'math', routerLink: 'math' },
        { routerName: 'about', routerLink: 'about' },
        { routerName: 'module', routerLink: 'module' },
        { routerName: 'map', routerLink: 'map' },
        // { routerName: 'ico', routerLink: 'ico' },
        // { routerName: 'http', routerLink: 'http' },
        { routerName: 'template', routerLink: 'template' },
        { routerName: 'form', routerLink: 'form' },
        { routerName: 'observable', routerLink: 'observable' },
        { routerName: 'cssSummary', routerLink: 'cssSummary' },
        { routerName: 'jsSummary', routerLink: 'jsSummary' },
        // { routerName: 'commonDirective', routerLink: 'commonDirective' },
        { routerName: 'chart', routerLink: 'chart' },
        { routerName: 'data-interaction', routerLink: 'data-interaction' },
    ]

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private routerName: RouterNameService,
        private ls: LocalStorage) { }

    ngOnInit() {
        this.routerUnsubscribe = this.router.events.subscribe((event) => {
            // example: NavigationStart, RoutesRecognized, NavigationEnd
            if (event instanceof NavigationEnd) { // 当导航成功结束时执行
                // this.routerName.setName(event.url);
                this.ls.set('routerName', event.urlAfterRedirects);
                this.acxtiveRouterName = this.ls.get('routerName');
                // console.log(this.acxtiveRouterName);
            }
        });
        // this.acxtiveRouterName = this.routerName.getName();
        // console.log(this.acxtiveRouterName);
        //  过滤出导航结束的事件
        //  使用 routerState 来获取路由状态树得到最后一个导航成功的路由
        // this.router.events
        //     .filter(event => event instanceof NavigationEnd)
        //     .map(() => this.router.routerState.root)
        //     //  也可以用ActivatedRoute来代替routerState.root
        //     .map(() => this.activatedRoute)
        //     //  创建一个while循环遍历状态树得到最后激活的 route，然后将其作为结果返回到流中
        //     .map(route => {
        //         while (route.firstChild) route = route.firstChild;
        //         return route;
        //     })
        //     //  过滤出未命名的outlet，<router-outlet>
        //     .filter(route => route.outlet === 'primary')
        //     //  获取路由配置数据
        //     // .mergeMap(route => route.data)
        //     // .mergeMap(route => route.routeConfig.path)
        //     .subscribe((event) => {
        //         // routerName = event.routeConfig.path;
        //         this.routerName.setName(event.routeConfig.path);
        //         this.acxtiveRouterName = this.routerName.getName();
        //         console.log(this.acxtiveRouterName);
        //     });
    }

    ngOnDestroy(): void {
        this.routerUnsubscribe.unsubscribe();
    }
}
