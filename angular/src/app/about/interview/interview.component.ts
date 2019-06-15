import { Component, OnInit } from '@angular/core';
import { InterviewContainerService } from '../../interview/interview-container-service/interview-container.service';

@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html',
    styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

    public option

    public choiceOption: any;

    constructor(
        private interviewContainerService: InterviewContainerService
    ) {
        this.defaultOption();
    }

    ngOnInit() {

    }

    public defaultOption() {
        this.choiceOption = this.interviewContainerService.getAllComponent();
    }

    public determineData(data) {
        let obj = [];
        data.forEach(item => {
            obj.push({
                type: item.type
            })
        });

        this.option = obj;
    }

}
