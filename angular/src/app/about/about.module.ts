import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUIModule } from './about.ui.module';
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { FormsModule } from '@angular/forms';

import { AboutRoutesModule } from './about.routes.module';

import { AboutComponent } from './about.component';
import { AboutIndexComponent } from './about-index/about-index.component';
import { AboutCreateComponent } from './about-create/about-create.component';
import { LayoutModule } from '../layout/layout.module';
import { ForeignExchangeAboutComponent } from './foreign-exchange-about/foreign-exchange-about.component';
import { PuppeteerComponent } from './puppeteer/puppeteer.component';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';
import { WebpackComponent } from './webpack/webpack.component';
import { InterviewModule } from '../interview/interview.module';
import { InterviewComponent } from './interview/interview.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { VideoServiceService } from '../service/video-service/video-service.service';
import { BaseService } from '../service/base/base.service';
import { VideoStreamMusicComponent } from './video-stream-music/video-stream-music.component';
import { VideoStreamVideoComponent } from './video-stream-video/video-stream-video.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { VsCodeComponent } from './vs-code/vs-code.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutesModule,
        AboutUIModule,
        NgZorroAntdModule,
        LayoutModule,
        FormsModule,
        CommonDirectivesModule,
        InterviewModule,
        MonacoEditorModule.forRoot()
    ],
    declarations: [
        AboutComponent,
        AboutIndexComponent,
        AboutCreateComponent,
        ForeignExchangeAboutComponent,
        PuppeteerComponent,
        WebpackComponent,
        InterviewComponent,
        VideoStreamComponent,
        VideoStreamMusicComponent,
        VideoStreamVideoComponent,
        VsCodeComponent,
    ],
    entryComponents: [
        VideoStreamMusicComponent
    ],
    providers: [
        VideoServiceService,
        BaseService
    ]
})

export class AboutModule { }
