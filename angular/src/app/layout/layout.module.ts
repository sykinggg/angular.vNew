import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        RouterModule
    ],
    providers: [
        LayoutComponent,
    ],
    entryComponents: [LayoutComponent],
    declarations: [LayoutComponent],
    exports: [LayoutComponent]
})
export class LayoutModule { }
