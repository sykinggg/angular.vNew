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

@NgModule({
    imports: [
        CommonModule,
        AboutRoutesModule,
        AboutUIModule,
        NgZorroAntdModule,
        LayoutModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        AboutComponent,
        AboutIndexComponent,
        AboutCreateComponent,
        ForeignExchangeAboutComponent,
        PuppeteerComponent,
        WebpackComponent,
    ]
})

export class AboutModule { }
