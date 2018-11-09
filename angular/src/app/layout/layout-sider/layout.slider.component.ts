import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-layout-slider',
    templateUrl: './layout.slider.component.html',
    styleUrls: ['./layout.slider.component.scss'],
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
export class LayoutSliderComponent implements OnInit, OnDestroy, AfterViewInit {
    
    @Input()
    routerLinkArr;

    routerStateCode = '';
    sub: Subscription;
    breadCrumbs: Array<string> = [];


    constructor(
        private router: Router,
        public route: ActivatedRoute,
    ) { }

    ngOnInit() {
        // filter(route => route.outlet === 'primary')                 // 过滤出未命名的outlet，<router-outlet>
        this.defaultBreadCrumbs();
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
                this.defaultBreadCrumbs();
            }, err => {
                console.log(err);
            });
    }

    ngAfterViewInit(): void {
        
    }

    defaultBreadCrumbs() {
        this.breadCrumbs = this.router.url.split('\/');
        this.breadCrumbs[0] = 'home';
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
