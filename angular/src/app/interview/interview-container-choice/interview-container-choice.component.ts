import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-interview-container-choice',
    templateUrl: './interview-container-choice.component.html',
    styleUrls: ['./interview-container-choice.component.scss']
})
export class InterviewContainerChoiceComponent implements OnInit {

    @Input() title: string;

    public allOption: Array<any> = [];
    public classOption: Array<any> = [];
    public hashKey: Array<any> = [];
    @Input() set option(data) {
        if (data) {
            for (let key in data) {
                let obj = {
                    name: data[key].name,
                    type: key,
                    className: data[key].className,
                    active: false
                }
                this.allOption.push(obj);

                if (this.hashKey.indexOf(data[key].className) === -1) {
                    this.classOption.push({
                        name: data[key].className,
                        active: true
                    })
                    this.hashKey.push(data[key].className);
                }
            }
        }
    };

    @Output() determineData: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    public choiceClass(item) {
        if (this.hashKey.indexOf(item.name) + 1) {
            this.hashKey.splice(this.hashKey.indexOf(item.name), 1);
        } else {
            this.hashKey.push(item.name);
        }
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
