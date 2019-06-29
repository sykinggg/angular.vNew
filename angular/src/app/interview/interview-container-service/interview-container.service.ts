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
import { JsCloneComponent } from '../components/js/js-clone/js-clone.component';
import { JsOperaCookieComponent } from '../components/js/js-opera-cookie/js-opera-cookie.component';
import { HtmlStandardComponent } from '../components/html/html-standard/html-standard.component';
import { JsThisComponent } from '../components/js/js-this/js-this.component';
import { JsArrDeWeightingComponent } from '../components/js/js-arr-de-weighting/js-arr-de-weighting.component';
import { CssDomShowHideComponent } from '../components/css/css-dom-show-hide/css-dom-show-hide.component';
import { JsTypeOfComponent } from '../components/js/js-type-of/js-type-of.component';

@Injectable({
    providedIn: 'root'
})
export class InterviewContainerService {

    protected componentRef = {
        cookie: {
            name: 'cookie 简介',
            component: InterviewCookieComponent,
            className: 'base'
        },
        storage: {
            name: 'storage 简介',
            component: InterviewStorageComponent,
            className: 'base'
        },
        htmlStandard: {
            name: 'web 标准',
            component: HtmlStandardComponent,
            className: 'base'
        },
        cookieStorage: {
            name: 'cookie & storage 简介',
            component: InterviewStorageAndCookieComponent,
            className: 'base'
        },
        cssTotal: {
            name: 'css 简介',
            component: InterviewCssComponent,
            className: 'css'
        },
        cssDisplayVisibility: {
            name: 'css display visibility',
            component: CssDisplayVisibilityComponent,
            className: 'css'
        },
        cssLinkImport: {
            name: 'css link import',
            component: CssLinkImportComponent,
            className: 'css'
        },
        cssPosition: {
            name: 'css position',
            component: CssPositionComponent,
            className: 'css'
        },
        cssBox: {
            name: 'css 盒子模型',
            component: CssBoxComponent,
            className: 'css'
        },
        cssSelector: {
            name: 'css 选择器',
            component: CssSelectorComponent,
            className: 'css'
        },
        cssDisplayPosition: {
            name: 'css display position',
            component: CssDisplayPositionComponent,
            className: 'css'
        },
        css3NewFeatures: {
            name: 'css3 新特性',
            component: Css3NewFeaturesComponent,
            className: 'css'
        },
        cssDefault: {
            name: 'css 初始化',
            component: CssDefaultComponent,
            className: 'css'
        },
        cssBFC: {
            name: 'css BFC',
            component: CssBFCComponent,
            className: 'css'
        },
        cssSprites: {
            name: 'css 雪碧图',
            component: CssSpritesComponent,
            className: 'css'
        },
        cssFloat: {
            name: 'css Float',
            component: CssFloatComponent,
            className: 'css'
        },
        cssFOUC: {
            name: 'css 样式闪烁',
            component: CssFOUCComponent,
            className: 'css'
        },
        cssDomShowHide: {
            name: 'css dom 显示/隐藏',
            component: CssDomShowHideComponent,
            className: 'css'
        },
        htmlTotal: {
            name: 'html 简介',
            component: InterviewHtmlComponent,
            className: 'html'
        },
        htmlDoctype: {
            name: 'html Doctype 严格模式&普通模式',
            component: HtmlDoctypeComponent,
            className: 'html'
        },
        htmlHistory: {
            name: 'html 历史',
            component: HtmlHistoryComponent,
            className: 'html'
        },
        htmlXml: {
            name: 'html && xml',
            component: HtmlXmlComponent,
            className: 'html'
        },
        html5NewFeatures: {
            name: 'html5 新特性',
            component: Html5NewFeaturesComponent,
            className: 'html'
        },
        htmlIframe: {
            name: 'html iframe',
            component: HtmlIframeComponent,
            className: 'html'
        },
        jsTotal: {
            name: 'js 简介',
            component: InterviewJsComponent,
            className: 'js'
        },
        jsSocket: {
            name: 'js socket',
            component: JsWebSocketComponent,
            className: 'js'
        },
        jsProcessThread: {
            name: 'js 进程 & 线程',
            component: JsProcessAndThreadComponent,
            className: 'js'
        },
        jsNullUndefined: {
            name: 'js null & undefined',
            component: JsNullUndefinedComponent,
            className: 'js'
        },
        jsSourceOptimization: {
            name: 'js 网站 优化',
            component: JsSourceOptimizationComponent,
            className: 'js'
        },
        jsNew: {
            name: 'js new',
            component: JsNewComponent,
            className: 'js'
        },
        jsAsyncLoad: {
            name: 'js 延时加载',
            component: JsAsyncLoadComponent,
            className: 'js'
        },
        jsCrossDomain: {
            name: 'js 跨域',
            component: JsCrossDomainComponent,
            className: 'js'
        },
        jsCallApply: {
            name: 'js call apply',
            component: JsCallApplyComponent,
            className: 'js'
        },
        jsGetPost: {
            name: 'js get post',
            component: JsGetPostComponent,
            className: 'js'
        },
        jsAjax: {
            name: 'js ajax',
            component: JsAjaxComponent,
            className: 'js'
        },
        jsClone: {
            name: 'js clone',
            component: JsCloneComponent,
            className: 'js'
        },
        jsOperatCookie: {
            name: 'js Cookie',
            component: JsOperaCookieComponent,
            className: 'js'
        },
        jsThis: {
            name: 'js this 使用',
            component: JsThisComponent,
            className: 'js'
        },
        jsArrDeWeighting: {
            name: 'js 数组去重',
            component: JsArrDeWeightingComponent,
            className: 'js'
        },
        jsTypeOf: {
            name: 'js 类型判断',
            component: JsTypeOfComponent,
            className: 'js'
        },
        webBase: {
            name: '前端基础 简介',
            component: InterviewBaseComponent,
            className: 'base'
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
