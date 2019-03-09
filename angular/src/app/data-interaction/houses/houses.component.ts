import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../layout/http.service';

@Component({
    selector: 'app-houses',
    templateUrl: './houses.component.html',
    styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

    constructor(
        private http: HttpService
    ) { }

    ngOnInit() {
    }

    private grawlDataLianjiaCity() {
        this.http.get({
            api: 'houses/grawlDataLianjiaCity'
        }).subscribe((res: any) => {
            console.log(res);
        })
    }

}
