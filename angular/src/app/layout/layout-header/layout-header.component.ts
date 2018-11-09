import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-layout-header',
    templateUrl: './layout-header.component.html',
    styleUrls: ['./layout-header.component.scss'],
    animations: [
        trigger('routeAnmiation', [
            state('void', style({ opacity: 0 })),
            state('active', style({ opacity: 1 })),
            transition('void => active', [
                animate(800, keyframes([
                    style({ opacity: 0, offset: 0 }),
                    style({ opacity: 0.6, offset: 0.4 }),
                    style({ opacity: 1, offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {

    @Input()
    routerLinkArr;

    @Input()
    acxtiveRouterName;

    routerStateCode = '';
    sub: Subscription;

    constructor(
        private router: Router,
        public route: ActivatedRoute,
    ) { }

    ngOnInit() {
        // filter(route => route.outlet === 'primary')                 // 过滤出未命名的outlet，<router-outlet>
        this.sub = this.router.events
            .pipe(
                map(event => {
                    if (event instanceof NavigationStart) {
                        this.routerStateCode = 'void';
                    }
                    return event;
                }),
                filter(event => event instanceof NavigationEnd),             // router导航结束时
                map(event => this.route),                                    // 获取路由状态树得到最后一个导航成功的route
            )
            .subscribe((route) => {
                this.routerStateCode = 'active';
            }, err => {
                console.log(err);
            });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
