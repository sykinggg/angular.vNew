import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-layout-footer',
    templateUrl: './layout-footer.component.html',
    styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {

    @Input()
    footerContent

    constructor() { }

    ngOnInit() {
    }

}
