import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pdf-embed',
    templateUrl: './pdf-embed.component.html',
    styleUrls: ['./pdf-embed.component.scss']
})
export class PdfEmbedComponent implements OnInit {

    @Input() outsideData: any;

    constructor() { }

    ngOnInit() {
        this.loadComponent(this.outsideData);
    }

    public loadComponent(data) {
        console.log(data);
    }

}
