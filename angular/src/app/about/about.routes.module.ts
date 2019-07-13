import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutIndexComponent } from './about-index/about-index.component';
import { AboutCreateComponent } from './about-create/about-create.component';
import { PuppeteerComponent } from './puppeteer/puppeteer.component';
import { WebpackComponent } from './webpack/webpack.component';
import { InterviewComponent } from './interview/interview.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';

const aboutRoutes = [
    {
        path: '',
        component: AboutComponent,
        children: [
            {
                path: '',
                redirectTo: 'aboutIndex',
                pathMatch: 'full'
            },
            {
                path: 'aboutIndex',
                component: AboutIndexComponent
            },
            {
                path: 'aboutCreate',
                component: AboutCreateComponent
            },
            {
                path: 'puppeteer',
                component: PuppeteerComponent
            },
            {
                path: 'webpack',
                component: WebpackComponent
            },
            {
                path: 'interview',
                component: InterviewComponent
            },
            {
                path: 'video',
                component: VideoStreamComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(aboutRoutes)
    ],
    exports: [RouterModule]
})

export class AboutRoutesModule {}
