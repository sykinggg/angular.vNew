import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-interview-container-choice',
    templateUrl: './interview-container-choice.component.html',
    styleUrls: ['./interview-container-choice.component.scss']
})
export class InterviewContainerChoiceComponent implements OnInit {

    @Input() title: string;

    public allOption: Array<any> = [];
    @Input() set option(data) {
        if (data) {
            console.log(data);
            for (let key in data) {
                let obj = {
                    name: key,
                    type: key,
                    active: false
                }
                this.allOption.push(obj);
            }
        }
    };

    @Output() determineData: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public determine() {
        let typeList = this.allOption.filter(item => {
            return item.active
        })

        this.determineData.emit(typeList);
    }

    public cancel() {
        this.allOption.forEach(item => {
            item.active = false;
        })
    }

}
