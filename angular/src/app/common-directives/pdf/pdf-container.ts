import { PdfObjectComponent } from './pdf-object/pdf-object.component';
import { PdfIframeComponent } from './pdf-iframe/pdf-iframe.component';
import { PdfEmbedComponent } from './pdf-embed/pdf-embed.component';

export interface IpdfContainerComponent {
    outsideData: any;
}

export const pdfContainer = {
    object: PdfObjectComponent,
    iframe: PdfIframeComponent,
    embed: PdfEmbedComponent,
};
