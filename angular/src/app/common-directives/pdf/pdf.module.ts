import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { PdfDirective } from './pdf.directive';
import { PdfContainerComponent } from './pdf-container/pdf-container.component';
import { PdfIframeComponent } from './pdf-iframe/pdf-iframe.component';
import { PdfEmbedComponent } from './pdf-embed/pdf-embed.component';
import { PdfObjectComponent } from './pdf-object/pdf-object.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgZorroAntdModule,
        FormsModule,
    ],
    declarations: [
        PdfDirective,
        PdfContainerComponent,
        PdfIframeComponent,
        PdfEmbedComponent,
        PdfObjectComponent,
    ],
    entryComponents: [
        PdfContainerComponent,
        PdfIframeComponent,
        PdfEmbedComponent,
        PdfObjectComponent,
    ],
    exports: [
        PdfContainerComponent,
        PdfIframeComponent,
        PdfEmbedComponent,
        PdfObjectComponent,
    ],
})
export class PdfModule { }
