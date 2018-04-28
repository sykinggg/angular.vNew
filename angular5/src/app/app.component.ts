import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { RouterNameService } from './service/router-name/router-name.service';

import { LocalStorage } from './common/local.storage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RouterNameService]
})
export class AppComponent {

    acxtiveRouterName: string = '';

    routerLinkArr: Array<any> = [
        { routerName: 'about', routerLink: 'about' },
        { routerName: 'map', routerLink: 'map' },
        // { routerName: 'http', routerLink: 'http' },
        { routerName: 'Alltemplate', routerLink: 'Alltemplate' },
        { routerName: 'form', routerLink: 'form' },
        { routerName: 'observable', routerLink: 'observable' }
    ]

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private routerName: RouterNameService,
        private ls: LocalStorage) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
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
}
