import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from '../service/http-service/base-service/base-service.service';

@Component({
    selector: 'app-http',
    templateUrl: './http.component.html',
    styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {

    constructor(private bService: BaseServiceService) { }

    ngOnInit(): void {
        this.bService.getHeroes()
            .then(heroes => {
                console.log(heroes);
            });
    }

}
