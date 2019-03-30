import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pdf-object',
    templateUrl: './pdf-object.component.html',
    styleUrls: ['./pdf-object.component.scss']
})
export class PdfObjectComponent implements OnInit {

    @Input() outsideData: any;

    constructor() { }

    ngOnInit() {
        this.loadComponent(this.outsideData);
    }

    public loadComponent(data) {
        console.log(data);
    }

}
