import { Injectable } from '@angular/core';
import { InterviewCookieComponent } from '../components/interview-cookie/interview-cookie.component';
import { InterviewStorageComponent } from '../components/interview-storage/interview-storage.component';
import { InterviewStorageAndCookieComponent } from '../components/interview-storage-and-cookie/interview-storage-and-cookie.component';
import { InterviewCssComponent } from '../components/interview-css/interview-css.component';
import { InterviewHtmlComponent } from '../components/interview-html/interview-html.component';
import { InterviewJsComponent } from '../components/interview-js/interview-js.component';
import { InterviewBaseComponent } from '../components/interview-base/interview-base.component';
import { CssDisplayVisibilityComponent } from '../components/css/css-display-visibility/css-display-visibility.component';
import { CssLinkImportComponent } from '../components/css/css-link-import/css-link-import.component';
import { CssPositionComponent } from '../components/css/css-position/css-position.component';
import { CssBoxComponent } from '../components/css/css-box/css-box.component';
import { CssSelectorComponent } from '../components/css/css-selector/css-selector.component';
import { CssDisplayPositionComponent } from '../components/css/css-display-position/css-display-position.component';
import { Css3NewFeaturesComponent } from '../components/css/css3-new-features/css3-new-features.component';
import { CssDefaultComponent } from '../components/css/css-default/css-default.component';
import { CssBFCComponent } from '../components/css/css-bfc/css-bfc.component';
import { CssSpritesComponent } from '../components/css/css-sprites/css-sprites.component';
import { CssFloatComponent } from '../components/css/css-float/css-float.component';
import { CssFOUCComponent } from '../components/css/css-fouc/css-fouc.component';
import { HtmlDoctypeComponent } from '../components/html/html-doctype/html-doctype.component';
import { HtmlHistoryComponent } from '../components/html/html-history/html-history.component';
import { HtmlXmlComponent } from '../components/html/html-xml/html-xml.component';
import { Html5NewFeaturesComponent } from '../components/html/html5-new-features/html5-new-features.component';
import { HtmlIframeComponent } from '../components/html/html-iframe/html-iframe.component';
import { JsWebSocketComponent } from '../components/js/js-web-socket/js-web-socket.component';
import { JsProcessAndThreadComponent } from '../components/js/js-process-and-thread/js-process-and-thread.component';
import { JsNullUndefinedComponent } from '../components/js/js-null-undefined/js-null-undefined.component';
import { JsSourceOptimizationComponent } from '../components/js/js-source-optimization/js-source-optimization.component';
import { JsNewComponent } from '../components/js/js-new/js-new.component';
import { JsAsyncLoadComponent } from '../components/js/js-async-load/js-async-load.component';
import { JsCrossDomainComponent } from '../components/js/js-cross-domain/js-cross-domain.component';
import { JsCallApplyComponent } from '../components/js/js-call-apply/js-call-apply.component';
import { JsGetPostComponent } from '../components/js/js-get-post/js-get-post.component';
import { JsAjaxComponent } from '../components/js/js-ajax/js-ajax.component';

@Injectable({
    providedIn: 'root'
})
export class InterviewContainerService {

    protected componentRef = {
        cookie: {
            name: 'cookie 简介',
            component: InterviewCookieComponent
        },
        storage: {
            name: 'storage 简介',
            component: InterviewStorageComponent
        },
        cookieStorage: {
            name: 'cookie & storage 简介',
            component: InterviewStorageAndCookieComponent
        },
        cssTotal: {
            name: 'css 简介',
            component: InterviewCssComponent
        },
        cssDisplayVisibility: {
            name: 'css display visibility',
            component: CssDisplayVisibilityComponent
        },
        cssLinkImport: {
            name: 'css link import',
            component: CssLinkImportComponent
        },
        cssPosition: {
            name: 'css position',
            component: CssPositionComponent
        },
        cssBox: {
            name: 'css 盒子模型',
            component: CssBoxComponent
        },
        cssSelector: {
            name: 'css 选择器',
            component: CssSelectorComponent
        },
        cssDisplayPosition: {
            name: 'css display position',
            component: CssDisplayPositionComponent
        },
        css3NewFeatures: {
            name: 'css3 新特性',
            component: Css3NewFeaturesComponent
        },
        cssDefault: {
            name: 'css 初始化',
            component: CssDefaultComponent
        },
        cssBFC: {
            name: 'css BFC',
            component: CssBFCComponent
        },
        cssSprites: {
            name: 'css 雪碧图',
            component: CssSpritesComponent
        },
        cssFloat: {
            name: 'css Float',
            component: CssFloatComponent
        },
        cssFOUC: {
            name: 'css 样式闪烁',
            component: CssFOUCComponent
        },
        htmlTotal: {
            name: 'html 简介',
            component: InterviewHtmlComponent
        },
        htmlDoctype: {
            name: 'html Doctype 严格模式&普通模式',
            component: HtmlDoctypeComponent
        },
        htmlHistory: {
            name: 'html 历史',
            component: HtmlHistoryComponent
        },
        htmlXml: {
            name: 'html && xml',
            component: HtmlXmlComponent
        },
        html5NewFeatures: {
            name: 'html5 新特性',
            component: Html5NewFeaturesComponent
        },
        htmlIframe: {
            name: 'html iframe',
            component: HtmlIframeComponent
        },
        jsTotal: {
            name: 'js 简介',
            component: InterviewJsComponent
        },
        jsSocket: {
            name: 'js socket',
            component: JsWebSocketComponent
        },
        jsProcessThread: {
            name: 'js 进程 & 线程',
            component: JsProcessAndThreadComponent
        },
        jsNullUndefined: {
            name: 'js null & undefined',
            component: JsNullUndefinedComponent
        },
        jsSourceOptimization: {
            name: 'js 网站 优化',
            component: JsSourceOptimizationComponent
        },
        jsNew: {
            name: 'js new',
            component: JsNewComponent
        },
        jsAsyncLoad: {
            name: 'js 延时加载',
            component: JsAsyncLoadComponent
        },
        jsCrossDomain: {
            name: 'js 跨域',
            component: JsCrossDomainComponent
        },
        jsCallApply: {
            name: 'js call apply',
            component: JsCallApplyComponent
        },
        jsGetPost: {
            name: 'js get post',
            component: JsGetPostComponent
        },
        jsAjax: {
            name: 'js ajax',
            component: JsAjaxComponent
        },
        webBase: {
            name: '前端基础 简介',
            component: InterviewBaseComponent
        }
    }

    constructor() { }

    public getComponent(type: string) {
        return this.componentRef[type].component;
    }

    public getAllComponent() {
        return this.componentRef;
    }
}
