import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-date-list',
    templateUrl: './date-list.component.html',
    styleUrls: ['./date-list.component.scss']
})
export class DateListComponent implements OnInit {
    weekList: Array<{ name: String, value: number }>;
    
    constructor() { }

    choice: Function = function(item) {
        let idx = this.weekData.indexOf(item.value);
        if(idx >= 0) {
            this.weekData.splice(idx, 1);
        }else{
            this.weekData.push(item.value);
        }
        this.childEvent.emit(this.weekData);
    }

    choiceWeekAll: Function = function() {
        if(this.weekData.length == 7) {
            this.weekData = [];
        }else{
            this.weekData = [1, 2, 3, 4, 5, 6, 7];
        }
        this.childEvent.emit(this.weekData);
    }

    @Input('weekData')
    weekData: Array<number>;

    @Output('childEvent') 
    childEvent = new EventEmitter<any>();

    ngOnInit() {
        this.weekList = [
            { name: '周一', value: 1 },
            { name: '周二', value: 2 },
            { name: '周三', value: 3 },
            { name: '周四', value: 4 },
            { name: '周五', value: 5 },
            { name: '周六', value: 6 },
            { name: '周日', value: 7 }
        ]
        console.log(this.weekData);
    }

}
