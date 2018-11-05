import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
//  基础模块
import { AppBaseModule } from './app.base.module';
//  ui模块
import { AppUIModule } from './app.ui.module';
//  路由模块
import { AppRoutingModule } from './app.routes.module';
//  根组件
import { AppComponent } from './app.component';

import { LocalStorage } from './common/local.storage';
//  UI组�, NZ_I18N, zh_CN��
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';

import { BasePipe } from './pipe/base/base.pipe';
import { HttpComponent } from './http/http.component';
import { BaseServiceService } from "./service/http-service/base-service/base-service.service";

import { ForbiddenNameDirective } from './directive/forbidden-name/forbidden-name.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

registerLocaleData(zh);
import { HttpClientModule } from '@angular/common/http';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { LayoutModule } from './layout/layout.module';


const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
    declarations: [
        AppComponent, // 根组件
        BasePipe,
        HttpComponent,
        ForbiddenNameDirective,
    ],
    imports: [
        AppBaseModule,
        AppUIModule,
        AppRoutingModule, // 路由
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule.forRoot(),
        LayoutModule, // UI组件引用
    ],
    providers: [
        LocalStorage,
        BaseServiceService,
        { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
        { provide: NZ_ICONS, useValue: icons }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
