import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { LayoutSliderComponent } from './layout-sider/layout.slider.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        RouterModule,
    ],
    providers: [
        LayoutSliderComponent, 
        LayoutHeaderComponent, 
        LayoutFooterComponent
    ],
    entryComponents: [
        LayoutSliderComponent, 
        LayoutHeaderComponent, 
        LayoutFooterComponent
    ],
    declarations: [
        LayoutSliderComponent, 
        LayoutHeaderComponent, 
        LayoutFooterComponent
    ],
    exports: [
        LayoutSliderComponent, 
        LayoutHeaderComponent, 
        LayoutFooterComponent
    ]
})
export class LayoutModule { }
