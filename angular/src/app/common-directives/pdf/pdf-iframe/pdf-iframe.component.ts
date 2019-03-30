import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pdf-iframe',
    templateUrl: './pdf-iframe.component.html',
    styleUrls: ['./pdf-iframe.component.scss']
})
export class PdfIframeComponent implements OnInit {

    @Input() outsideData: any;

    constructor() { }

    ngOnInit() {
        this.loadComponent(this.outsideData);
    }

    public loadComponent(data) {
        console.log(data);
    }
}
