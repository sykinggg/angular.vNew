import { NgModule } from '@angular/core';
//  基础模块
import { AppBaseModule } from './app.base.module';
//  ui模块
import { AppUIModule } from './app.ui.module';
//  路由模块
import { AppRoutingModule } from './app.routes.module';
//  根组件
import { AppComponent } from './app.component';

import { LocalStorage } from './common/local.storage';
//  UI组件
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { BasePipe } from './pipe/base/base.pipe';
import { HttpComponent } from './http/http.component';
import { BaseServiceService } from "./service/http-service/base-service/base-service.service";

import { ForbiddenNameDirective } from './directive/forbidden-name/forbidden-name.directive';




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
        NgZorroAntdModule.forRoot() // UI组件引用
    ],
    providers: [
        LocalStorage,
        BaseServiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
