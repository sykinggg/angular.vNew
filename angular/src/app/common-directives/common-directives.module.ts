import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { WaterFullMovieComponent } from './water-full-movie/water-full-movie.component';
import { WaterFullComponent } from './water-full/water-full.component';
import { AddressLinkageComponent } from './address-linkage/address-linkage.component';
import { CustomAddressLinkageComponent } from './custom-address-linkage/custom-address-linkage.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgZorroAntdModule,
        FormsModule
    ],
    declarations: [
        WaterFullMovieComponent,
        WaterFullComponent,
        AddressLinkageComponent,
        CustomAddressLinkageComponent,
    ],
    entryComponents: [
        WaterFullMovieComponent,
        WaterFullComponent,
        AddressLinkageComponent,
        CustomAddressLinkageComponent,
    ],
    exports: [
        WaterFullMovieComponent,
        WaterFullComponent,
        AddressLinkageComponent,
        CustomAddressLinkageComponent,
    ],
})
export class CommonDirectivesModule { }
