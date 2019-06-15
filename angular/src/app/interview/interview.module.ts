import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewContainerComponent } from './interview-container/interview-container.component';
import { InterviewContainerDirective } from './interview-container-directive/interview-container.directive';
import { InterviewCookieComponent } from './interview-cookie/interview-cookie.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { InterviewContainerChoiceComponent } from './interview-container-choice/interview-container-choice.component';
import { FormsModule } from '@angular/forms';
import { InterviewStorageComponent } from './interview-storage/interview-storage.component';
import { InterviewStorageAndCookieComponent } from './interview-storage-and-cookie/interview-storage-and-cookie.component';
import { InterviewCssComponent } from './interview-css/interview-css.component';
import { InterviewHtmlComponent } from './interview-html/interview-html.component';
import { InterviewJsComponent } from './interview-js/interview-js.component';
import { InterviewBaseComponent } from './interview-base/interview-base.component';

@NgModule({
    declarations: [
        InterviewContainerComponent,
        InterviewContainerDirective,
        InterviewCookieComponent,
        InterviewContainerChoiceComponent,
        InterviewStorageComponent,
        InterviewStorageAndCookieComponent,
        InterviewCssComponent,
        InterviewHtmlComponent,
        InterviewJsComponent,
        InterviewBaseComponent
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
    ],
    exports: [
        InterviewContainerComponent,
        InterviewContainerDirective,
        InterviewCookieComponent,
        InterviewContainerChoiceComponent,
        InterviewStorageComponent,
        InterviewStorageAndCookieComponent,
        InterviewCssComponent,
        InterviewHtmlComponent,
        InterviewJsComponent,
        InterviewBaseComponent
    ],
    entryComponents: [
        InterviewContainerComponent,
        InterviewCookieComponent,
        InterviewContainerChoiceComponent,
        InterviewStorageComponent,
        InterviewStorageAndCookieComponent,
        InterviewCssComponent,
        InterviewHtmlComponent,
        InterviewJsComponent,
        InterviewBaseComponent
    ]
})
export class InterviewModule { }
