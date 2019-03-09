import { Component, OnInit, Input } from '@angular/core';
import { D3Option } from './ID3';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-d3',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

    option: BehaviorSubject<any> = new BehaviorSubject({});

    @Input() set setdata(option: D3Option) {
        if (option) {
            this.option.next(option);
        }
    }

    constructor() { }

    defaultChart(option) {
        console.log(option);
    }

    optionData;
    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.option.subscribe(data => {
                this.optionData = data;
                this.defaultChart(this.optionData);
            })
        }, 500)
    }

}
