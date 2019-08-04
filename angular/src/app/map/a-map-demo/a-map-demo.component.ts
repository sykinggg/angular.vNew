import { Component, OnInit, ViewChild } from '@angular/core';
import { AMapDefaultService } from '../a-map/services/a-map-default.service';
import { AMapViewDirective } from '../a-map/directive/a-map-view.directive';

@Component({
    selector: 'app-a-map-demo',
    templateUrl: './a-map-demo.component.html',
    styleUrls: ['./a-map-demo.component.scss']
})
export class AMapDemoComponent implements OnInit {

    @ViewChild(AMapViewDirective, { static: false }) host: AMapViewDirective;

    constructor(public aMapDefaultService: AMapDefaultService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.render();
    }

    public render() {
        setTimeout(() => {
            console.log('a-map-demo');
            this.aMapDefaultService.default('a-map-demo');
        })
    }



}
