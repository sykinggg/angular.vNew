import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { InterviewContainerComponent } from './interview-container/interview-container.component';
import { InterviewContainerDirective } from './interview-container-directive/interview-container.directive';
import { InterviewContainerChoiceComponent } from './interview-container-choice/interview-container-choice.component';
import { InterviewCookieComponent } from './components/interview-cookie/interview-cookie.component';
import { InterviewStorageComponent } from './components/interview-storage/interview-storage.component';
import { InterviewStorageAndCookieComponent } from './components/interview-storage-and-cookie/interview-storage-and-cookie.component';
import { InterviewCssComponent } from './components/interview-css/interview-css.component';
import { InterviewHtmlComponent } from './components/interview-html/interview-html.component';
import { InterviewJsComponent } from './components/interview-js/interview-js.component';
import { InterviewBaseComponent } from './components/interview-base/interview-base.component';
import { CssDisplayVisibilityComponent } from './components/css/css-display-visibility/css-display-visibility.component';
import { CssLinkImportComponent } from './components/css/css-link-import/css-link-import.component';
import { CssPositionComponent } from './components/css/css-position/css-position.component';
import { CssBoxComponent } from './components/css/css-box/css-box.component';
import { CssSelectorComponent } from './components/css/css-selector/css-selector.component';
import { CssDisplayPositionComponent } from './components/css/css-display-position/css-display-position.component';
import { Css3NewFeaturesComponent } from './components/css/css3-new-features/css3-new-features.component';
import { CssDefaultComponent } from './components/css/css-default/css-default.component';
import { CssBFCComponent } from './components/css/css-bfc/css-bfc.component';
import { CssSpritesComponent } from './components/css/css-sprites/css-sprites.component';
import { CssFloatComponent } from './components/css/css-float/css-float.component';
import { CssFOUCComponent } from './components/css/css-fouc/css-fouc.component';
import { HtmlDoctypeComponent } from './components/html/html-doctype/html-doctype.component';
import { HtmlHistoryComponent } from './components/html/html-history/html-history.component';
import { HtmlXmlComponent } from './components/html/html-xml/html-xml.component';
import { Html5NewFeaturesComponent } from './components/html/html5-new-features/html5-new-features.component';
import { HtmlIframeComponent } from './components/html/html-iframe/html-iframe.component';
import { JsWebSocketComponent } from './components/js/js-web-socket/js-web-socket.component';
import { JsProcessAndThreadComponent } from './components/js/js-process-and-thread/js-process-and-thread.component';
import { JsNullUndefinedComponent } from './components/js/js-null-undefined/js-null-undefined.component';
import { JsSourceOptimizationComponent } from './components/js/js-source-optimization/js-source-optimization.component';
import { JsNewComponent } from './components/js/js-new/js-new.component';
import { JsAsyncLoadComponent } from './components/js/js-async-load/js-async-load.component';
import { JsCrossDomainComponent } from './components/js/js-cross-domain/js-cross-domain.component';
import { JsCallApplyComponent } from './components/js/js-call-apply/js-call-apply.component';
import { JsGetPostComponent } from './components/js/js-get-post/js-get-post.component';
import { JsAjaxComponent } from './components/js/js-ajax/js-ajax.component';

let outputArr: any = [
    InterviewContainerComponent,
    InterviewCookieComponent,
    InterviewContainerChoiceComponent,
    InterviewStorageComponent,
    InterviewStorageAndCookieComponent,
    InterviewCssComponent,
    InterviewHtmlComponent,
    InterviewJsComponent,
    InterviewBaseComponent,
    CssDisplayVisibilityComponent,
    CssLinkImportComponent,
    CssPositionComponent,
    CssBoxComponent,
    CssSelectorComponent,
    CssDisplayPositionComponent,
    Css3NewFeaturesComponent,
    CssDefaultComponent,
    CssBFCComponent,
    CssSpritesComponent,
    CssFloatComponent,
    CssFOUCComponent,
    HtmlDoctypeComponent,
    HtmlHistoryComponent,
    HtmlXmlComponent,
    Html5NewFeaturesComponent,
    HtmlIframeComponent,
    JsWebSocketComponent,
    JsProcessAndThreadComponent,
    JsNullUndefinedComponent,
    JsSourceOptimizationComponent,
    JsNewComponent,
    JsAsyncLoadComponent,
    JsCrossDomainComponent,
    JsCallApplyComponent,
    JsGetPostComponent,
    JsAjaxComponent
]

let onlydeclarationsArr: any = [
    InterviewContainerDirective
]

@NgModule({
    declarations: onlydeclarationsArr.concat(outputArr),
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
    ],
    exports: outputArr,
    entryComponents: outputArr
})
export class InterviewModule { }
