import { Injectable } from '@angular/core';
import { InterviewCookieComponent } from '../interview-cookie/interview-cookie.component';
import { InterviewStorageComponent } from '../interview-storage/interview-storage.component';
import { InterviewStorageAndCookieComponent } from '../interview-storage-and-cookie/interview-storage-and-cookie.component';
import { InterviewCssComponent } from '../interview-css/interview-css.component';
import { InterviewHtmlComponent } from '../interview-html/interview-html.component';
import { InterviewJsComponent } from '../interview-js/interview-js.component';
import { InterviewBaseComponent } from '../interview-base/interview-base.component';

@Injectable({
    providedIn: 'root'
})
export class InterviewContainerService {

    protected componentRef = {
        cookie: InterviewCookieComponent,
        storage: InterviewStorageComponent,
        cookieStorage: InterviewStorageAndCookieComponent,
        cssTotal: InterviewCssComponent,
        htmlTotal: InterviewHtmlComponent,
        jsTotal: InterviewJsComponent,
        webBase: InterviewBaseComponent
    }

    constructor() { }

    public getComponent(type: string) {
        return this.componentRef[type];
    }

    public getAllComponent() {
        return this.componentRef;
    }
}
